const electron = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const crypto = require('crypto')

const DB_DAO = require('./db')
const connecionDb = new DB_DAO()
const store = require('./store')
const esquemaDb = require('./esquemaDb') 
const ipcMain = electron.ipcMain
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration:true
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => {
    const conexion = connecionDb.getConeccion()
    if (conexion) {
      console.log('Cerrando App')
      conexion.close()
    }
   mainWindow = null
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});


const getDatabaseConfig= () => { 
  const config = {
    db_host: store.get('db_host'),
    db_name: store.get('db_name')
  }
  return config
}

const compareStrings = (str1, str2) => {
  if (str1.length !== str2.length) return false
  for (let index = 0; index < str1.length; index++){
    if(str1[index] !== str2[index]) return false
  }
  return true
}

const setConfig = (objeto) => { 
  store.set(objeto)
}
//Registrar Usuario 
const registrarUsuario = async (event, nuevoUsuario) => {
  const { permisos, ...infoUsuario } = nuevoUsuario
  const { username, password } = infoUsuario
  const hash = crypto.createHash('sha256')
  try {
    console.log(infoUsuario)
    const conexion = connecionDb.getConeccion()
    await conexion
    const solicitudesPermisos = []
    console.log(permisos)
    for (const [tabla, permiso] of Object.entries(permisos)) {
      if (permiso == 0) continue
      solicitudesPermisos.push(conexion.request().query(`
      Select IdPermiso
      from Permiso
      where tabla = '${tabla}' and crud = ${permiso}`))

    }
    const results = await Promise.all(solicitudesPermisos)
    console.log(results.recordset)
    console.log('Resultado de los select Permisos')
    await conexion.request().query(`Create Login ${username} with password = '${password}'`)// Crea Login
    await conexion.request().query(`Create User ${username} for login ${username} `)// 
    const createUserString = `Insert into Usuario values
    ('${username}','${hash.update(password).digest('hex')}', '${infoUsuario.nombre}','${infoUsuario.apellido}' );
    Select SCOPE_IDENTITY() as id`
    console.log(createUserString)
    const createUserInTable = await conexion.request().query(createUserString)
    console.log(await conexion.request().query(`Select * from Usuario where Usuario.IdUsuario = ${createUserInTable.recordset[0].id} `))
    const insertQueue = []
    for (const permiso of results) {
      console.log('Loop permiso')
      console.log(permiso)
      if (permiso.recordset.length == 1) {
        const idPermiso = permiso.recordset[0].IdPermiso
        const resultInsert = await conexion.request().query(`Insert into Usuario_Permiso 
        values(${createUserInTable.recordset[0].id}, ${idPermiso})`)
        console.log('Acabo de Insertart en usuario_permiso')
        console.log(resultInsert)
      }

    }
    // if(array.includes('Select')) => Grant Select on v${tabla}
    // if(array.includes('Insert')) => Grant execture on spInsert${tabla}
    for (const [tabla, permiso] of Object.entries(permisos)) {
      if (permiso == 0) continue
      const permisosSQL = []
      const permisoBinario = permiso.toString(2).padStart(4, '0')
      for (let index = 0; index < permisoBinario.length; index += 1) {
        if (permisoBinario.charAt(index) == '1') {
          switch (index) {
            case 0: {
              permisosSQL.push('Delete')
              break;
            }
            case 1: {
              permisosSQL.push('Update')
              break;
            }
            case 2: {
              permisosSQL.push('Insert')
              break;
            }
            case 3: {
              permisosSQL.push('Select')
              break;
            }
          }
        }
      }
      console.log(tabla, permisosSQL)
      await conexion.request().query(`GRANT ${permisosSQL.join(',')} on ${tabla} to ${username}`)
      if (esquemaDb.TablasConTablasIntermedias.includes(tabla)) {
        console.log(tabla)
        const tablasIntermedia = esquemaDb.esquema[tabla]
        await conexion.request().query(`GRANT ${permisosSQL.join(',')} on ${tablasIntermedia[0]} to ${username}`)


      }
      if (permisosSQL.includes('Select')) {
        console.log('Agregar Select Vista Tabla', tabla)
        await conexion.request().query(`GRANT Select on v${tabla} to ${username}`)
        const tablasIntermedia = esquemaDb.esquema[tabla]
        for (const tablaIntermedia of tablasIntermedia) {
          if (tablaIntermedia.length === 0) continue
          console.log('Agregando Select Vistas a tablas intermedia', tablaIntermedia)
          await conexion.request().query(`GRANT Select on v${tablaIntermedia} to ${username}`)
          console.log('Termino Tablas Intermedias')
        }
      }
    }
    await conexion.request().query(`GRANT execute on sp_MiData to ${username}`)
    await conexion.request().query(`GRANT execute on sp_MisPermisos to ${username}`)
    console.log('Termino el Registro')
  } catch (e) {
    console.log(e)
    event.reply(e)
  }
}
//Set up
connecionDb.setUp(store.get('db_host'), store.get('db_name'))
console.log(connecionDb)
// Eventos 
ipcMain.on('db-config', (e, arg) => { 
  e.returnValue = getDatabaseConfig()
})

ipcMain.on('login', async (e, ...arg) => {
  const [username, password] = arg
  const response = { logged : false}
  try {
    
    let coneccion = connecionDb.getConeccion()
    console.log(coneccion)
    if (!coneccion) { 
      coneccion = await connecionDb.loginToDB(username, password)
      console.log('coneccion generada')
    }
    if (username != 'sa') { // si el usuario no es sa
      console.log(coneccion)
      const hash = crypto.createHash('sha256') // crea el encriptador
      const query = `execute sp_MiData '${username}', '${hash.update(password).digest('hex')}'`//crea el query para ejecutar el sp con el username y la contrase;a encriptada
      console.log('query creada')
      const userData = await coneccion.request().query(query) // ejecuta el query
      console.log('Connsiguiendo el usuario')
      response.user = userData.recordset // se guardan los datos en el objeto
      console.log(response.user)
      const permisosQuery = `execute sp_MisPermisos ${response.user[0].IdUsuario}` // se llaman a los permisos
      permisosResponse = await coneccion.request().query(permisosQuery) // se ejecuta el sp
      response.user[0].permisos = permisosResponse.recordset // se guarda el resultado
    } else { // si es sa
      response.user = [{ permisos: [{ tabla: 'sa', crud: 1 }] }]
    }
    response.logged = true
    console.log('reply')
    console.log(response.user[0].permisos)
    e.reply('login-reply', response)
  } catch (error) {
    console.log(error)
    e.reply('login-reply',response)
 }

})
ipcMain.on('set-config', (e, ...arg) => {
  setConfig(arg)
  const respuesta = {}
  const valores = Object.entries(arg)
  for (const [llave, valor] in valores) {
    respuesta[llave] = valor
  }
  e.reply('set-config-reply', respuesta)
})

ipcMain.on('set-conection', async (e, objetoConeccion) => {
  try {
    console.log(objetoConeccion)
    const result = await connecionDb.testConeccion(objetoConeccion)
    console.log(result)
    if (result) {
      e.reply('set-conection-reply', true)
      store.set({
        db_host: objetoConeccion.server,
        db_name: objetoConeccion.database
      })
    }
  } catch (error) {
    console.log(error)
    e.reply('set-conection-reply', false)
  }
})

ipcMain.on('registrar-usuario', registrarUsuario )
ipcMain.on("rootCommand", async (event, args) => {
  try {
  // Se consigue la coneccion al db
    const conecion = connecionDb.getConeccion()
    // se conecta como tal
    await conecion
    // hace la solicutd
    const request = await conecion.request().query(args)
    // devuelve el valor al front end
    console.log(request)
    event.reply('rootCommand-reply', request)
  } catch (error) {
    event.reply('rootCommand-reply',e)
    console.log(error)
  }
})

ipcMain.on('get-facturas', async (event, args) => { 
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const result = await conexion.request().query(`Select * from vFactura`)
    console.log(result)
    event.reply('get-facturas-reply', result.recordset)
  } catch (e) { 
    event.reply('get-facturas-reply',e)
    console.log(e)
  }

})

ipcMain.on('delete-factura', async (event, idFactura) => {
  try {
    console.log('IdFactura ' , idFactura)
    const conexion = connecionDb.getConeccion()
    await conexion
    const result = await conexion.request().query(`Delete from Factura where IdFactura = ${idFactura}`)
    event.reply('delete-factura-reply', {ok: true})
  } catch (e) {
    event.reply('delete-factura-reply', e)
    console.log(e)
  }

})



ipcMain.on('get-factura-detalle', async (event, idFactura) => { 
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const factura = await conexion.request().query(`Select * from vFactura where IdFactura = ${idFactura}`)
    const detalleFactura = await conexion.request().query(`Select * from vDetalleFactura where IdFactura = ${idFactura}`)
    const response = {
      ...factura.recordset[0],
      detalleFactura : detalleFactura.recordset
    }
    console.log(response)
    event.reply('get-factura-detalle-reply', response)
  } catch (e) { 
    event.reply('get-factura-detalle-reply',e)
    console.log(e)
  }

})
ipcMain.on('update-factura-detalle', async (event, facturaRecibida) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const { detalleFactura,vendedor, IdFactura, ...factura } = facturaRecibida
    console.log(factura)
    console.log(detalleFactura)
    factura.cancelado = factura.cancelado? 1 : 0
    const facturaValues = Object.entries(factura).map(([key, val]) => {
      const escapedValue = typeof val === 'string' ? `'${val}'` : val
      return `${key} = ${escapedValue}`
      }).join(',')
    const facturaQuery = `Update Factura  SET ${facturaValues} where IdFactura = ${IdFactura}`
    const detallesFacturaQuery = detalleFactura.map(detalle => {
      const {IdFactura, platillo, IdDetalleFactura,precio , ...detalleCurado } = detalle
      const detalleQuery = Object.entries(detalleCurado).map(([key, val]) => {
        const escapedValue = typeof val === 'string' ? `'${val}'` : val
        return `${key} = ${escapedValue}`
      }).join(',')
      return `Update DetalleFactura set ${detalleQuery} where IdDetalleFactura = ${IdDetalleFactura}`
    })
    console.log(facturaQuery)
    console.log(detallesFacturaQuery)
    const resultadoFactura = await conexion.request().query(facturaQuery)
    const resultadoDetalleFactura = await conexion.request().query(detallesFacturaQuery.join(';'))
  } catch (e) {
    event.reply('update-factura-detalle', e)
  }

})



ipcMain.on('get-platillos', async (event, args) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const result = await conexion.request().query(`Select * from vPlatillo`)
    console.log('Enviando', result.recordset)
    event.reply('get-platillos-reply', result.recordset)
  } catch (e) {
    event.reply('get-platillos-reply', e)
    console.log(e)
  }
})
ipcMain.on('get-platillo-detalle', async (evento, IdPlatillo) => {
  try {
    console.log('get-platillo-detalle')
    const conexion = connecionDb.getConeccion()
    await conexion
    console.log('IdPlatillo', IdPlatillo)
    const platilloQuery =  conexion.request().query(`Select * from vPlatillo where IdPlatillo = ${IdPlatillo}`)
    const ingredienteQuery = conexion.request().query(`Select * from vPlatillo_Ingrediente where IdPlatillo = ${IdPlatillo}`)
    console.log('Destructurando el Promise')
    const [platilloRecordet, ingredienteRecordset] = await Promise.all([platilloQuery, ingredienteQuery])
    console.log(platilloRecordet)
    console.log(ingredienteRecordset)
    const platillo = platilloRecordet.recordset[0]
    const ingredientes = ingredienteRecordset.recordset
    const response = {
      ...platillo,
      ingredientes
    }

    console.log('Response' ,response)
    evento.reply('get-platillo-detalle-reply', response)

  } catch (e) {
    console.log(e)
    evento.reply('get-platillo-detalle-reply',e)
  }
})
ipcMain.on('create-platillo', async (evento, request) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const { ingredientes, ...platillo } = request
    console.log('Request', request)
    console.log('Ingredientes', ingredientes)
    console.log('Platillo', platillo);
    

    const platilloInsertRecorset = await conexion.request().query(`Insert into Platillo values('${platillo.nombre}',${platillo.precio},${platillo.porcentajeDescuento}); Select SCOPE_IDENTITY() as id`)
    const platilloId = platilloInsertRecorset.recordset[0].id
    const platilloIngredienteQuerys = []
    for (const ingrediente of ingredientes) {
      platilloIngredienteQuerys.push(
        conexion.request().query(`Insert into Platillo_Ingrediente values
        (${ingrediente.idInventario}, ${platilloId},${ingrediente.IdUnidad}, ${ingrediente.cantidad})`)
      )
    }
    await Promise.all(platilloIngredienteQuerys)
    console.log('Enviando', )
    evento.reply('create-platillo-reply', {ok: true})
  } catch (e) {
    evento.reply('create-platillo-reply', e)
    console.log(e)
  }
})

ipcMain.on('get-unidad', async (event, args) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const result = await conexion.request().query(`Select * from vUnidad`)
    console.log('Enviando', result.recordset)
    event.reply('get-unidad-reply', result.recordset)
  } catch (e) {
    event.reply('get-unidad-reply', e)
    console.log(e)
  }
})
ipcMain.on('get-inventario', async (event, args) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const result = await conexion.request().query(`Select * from vInventario`)
    console.log('Enviando', result.recordset)
    event.reply('get-inventario-reply', result.recordset)
  } catch (e) {
    event.reply('get-inventario-reply', e)
    console.log(e)
  }
})
ipcMain.on('get-inventario-id', async (event, IdInventario) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const result = await conexion.request().query(`Select * from vInventario where IdInventario = ${IdInventario}`)
    console.log('Enviando', result.recordset)
    event.reply('get-inventario-id-reply', result.recordset[0])
  } catch (e) {
    event.reply('get-inventario-id-reply', e)
    console.log(e)
  }
})

ipcMain.on('update-inventario', async (event, request) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const result = await conexion.request().query(`Update Inventario set ingrediente='${request.ingrediente}'
      ,idUnidad=${request.IdUnidad} , cantidad=${request.cantidad}
    where IdInventario = ${request.IdInventario}`)
    event.reply('get-inventario-id-reply', {ok: true})
  } catch (e) {
    event.reply('get-inventario-id-reply',{ok: false, e})
    console.log(e)
  }
})


ipcMain.on('create-factura', async (event, args) => {
  const response = { ok : false }
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const { detalleFactura, ...factura } = args
    const insertFacturaQuery = `Insert into Factura values(${factura.IdUsuario},'${factura.nombreCliente}',${factura.precioTotal}, ${factura.totalDescontado } ,GETDATE(),${factura.cancelado ? 1 : 0});Select SCOPE_IDENTITY() as idFactura `
    console.log(insertFacturaQuery)
    const insertFactura = await conexion.request().query(insertFacturaQuery)
    const idFactura = insertFactura.recordset[0].idFactura
    const resultDetalle = []
    for (const orden of detalleFactura) { 
      const ordenQuery = `Insert into DetalleFactura values(${orden.IdPlatillo},${idFactura},${orden.cantidad},${orden.subTotal},${orden.valorDescontado || 0})`
      console.log(ordenQuery)
      resultDetalle.push(conexion.request().query(ordenQuery))
    }
    await Promise.all(resultDetalle)
    console.log('Enviando')
    response.ok = true
    event.reply('create-factura-reply',response )
  } catch (e) {
    response.error = e
    event.reply('create-factura-reply', response)
    console.log(e)
  }
})

ipcMain.on('get-usuario-permisos', async (evento, idUsuario) => {
  try {
    
    const conexion = connecionDb.getConeccion()
    await conexion
    const infoUsuarioRecordset = await conexion.request().query(`Select * from vUsuario where IdUsuario = ${idUsuario}`)
    const infoUsuario = infoUsuarioRecordset.recordset[0]
    const permisosUsuarioRecordet = await conexion.request().query(`Select * from vUsuario_Permiso where idUsuario = ${infoUsuario.IdUsuario}`)
    const permisosUsuario = permisosUsuarioRecordet.recordset.reduce((acc, current) => {
      console.log('Before ', acc)
      acc[current.tabla] = current.crud
     return acc
    }, {})
    console.log({ ...infoUsuario, permisos: permisosUsuario })
    evento.reply('get-usuario-permisos-reply',{...infoUsuario, permisos : permisosUsuario})


  } catch (e) {
    console.log(e)
    evento.reply('get-usuario-permisos-reply',e)
  }

})

ipcMain.on('update-usuario-permisos', async (evento, arg) => {
  try {
    console.log('Args ',arg)
    const conexion = connecionDb.getConeccion()
    await conexion
    const { permisosUsuario, ...infoUsuario } = arg
    console.log(permisosUsuario)
    console.log(infoUsuario);
    
    const currentUserData = await conexion.request().query(`Select * from vUsuario where IdUsuario = ${infoUsuario.IdUsuario}`)
    const { nombreUsuario, contrasena } = currentUserData.recordset[0]
    console.log(`Nombres de Usuario ${infoUsuario.nombreUsuario} = ${nombreUsuario} `, infoUsuario.nombreUsuario != nombreUsuario)
    console.log(`Contrase;as ${infoUsuario.contrasena} = ${contrasena} :`, infoUsuario.contrasena != contrasena)
    const nombreUsuarioIguales = compareStrings(infoUsuario.nombreUsuario, nombreUsuario)
    console.log('Nombre Iguales ', nombreUsuarioIguales)
    const contrasenasIguales = compareStrings(infoUsuario.contrasena ,contrasena)
      console.log('Contrasena Iguales ', contrasenasIguales)
    const recrearUsuario = (! nombreUsuarioIguales) ||( ! contrasenasIguales)
    console.log('Recrear Usuario ', recrearUsuario)
    if (recrearUsuario) {
      await conexion.request().query(`Drop login ${nombreUsuario}`)
      console.log('Login Dropped')
      await conexion.request().query(`Drop user ${nombreUsuario}`)
      console.log('User Dropped')
      await conexion.request().query(`Create Login ${infoUsuario.nombUsuario} with password = '${infoUsuario.contrasena}'`)// Crea Login
      console.log('Login Created')
      await conexion.request().query(`Create User ${infoUsuario.nombUsuario} for login ${infoUsuario.nombUsuario} `)// 
      console.log('User Created')
      if (!nombreUsuarioIguales) {
       console.log('Los nombres no son iguales') 
        await conexion.request().query(`Update Usuario set nombreUsuario = '${infoUsuario.nombUsuario}' where IdUsuario = ${infoUsuario.IdUsuario}`)
        console.log('Nombre Actualizado')
      }
      if (!contrasenasIguales) {
        const hash = crypto.createHash('sha256')
        await conexion.request().query(`Update Usuario set contrasena = '${hash.update(password).digest('hex')}' where IdUsuario = ${infoUsuario.IdUsuario}`)
      }
    }

    const solicitudesPermisos = []
    console.log(permisosUsuario)
    //Se consiguen los permisos
    for (const [tabla, permiso] of Object.entries(permisosUsuario)) {
      if (permiso == 0) continue
      solicitudesPermisos.push(conexion.request().query(`
      Select IdPermiso
      from Permiso
      where tabla = '${tabla}' and crud = ${permiso}`))

    }
    // Los permisos como tal
    const results = await Promise.all(solicitudesPermisos)
    console.log(results.recordset)
    console.log('Resultado de los select Permisos')
    await conexion.request().query(`Delete from Usuario_Permiso where IdUsuario = ${infoUsuario.IdUsuario}`)
    for (const permiso of results) {
      console.log('Loop permiso')
      console.log(permiso)
      if (permiso.recordset.length == 1) {
        const idPermiso = permiso.recordset[0].IdPermiso
        const resultInsert = await conexion.request().query(`Insert into Usuario_Permiso 
        values(${infoUsuario.IdUsuario}, ${idPermiso})`)
        console.log('Acabo de Insertart en usuario_permiso')
        console.log(resultInsert)
      }
    }

    // Realiza los permisos de SQL server
    for (const [tabla, permiso] of Object.entries(permisosUsuario)) {
      const revokeQuery = `Revoke Select, Insert, Update, Delete on ${tabla} to ${infoUsuario.nombreUsuario}`
      console.log(revokeQuery);
      await conexion.request().query(revokeQuery)
      if (permiso == 0) continue
      const permisosSQL = []
      const permisoBinario = permiso.toString(2).padStart(4, '0')
      for (let index = 0; index < permisoBinario.length; index += 1) {
        if (permisoBinario.charAt(index) == '1') {
          switch (index) {
            case 0: {
              permisosSQL.push('Delete')
              break;
            }
            case 1: {
              permisosSQL.push('Update')
              break;
            }
            case 2: {
              permisosSQL.push('Insert')
              break;
            }
            case 3: {
              permisosSQL.push('Select')
              break;
            }
          }
        }
      }
      console.log(tabla, permisosSQL)

      
      const granQuery = `GRANT ${permisosSQL.join(',')} on ${tabla} to ${infoUsuario.nombreUsuario}`
      console.log(granQuery);
      await conexion.request().query(granQuery)
      if (esquemaDb.TablasConTablasIntermedias.includes(tabla)) {
        console.log(tabla)
        const tablasIntermedia = esquemaDb.esquema[tabla]
        await conexion.request().query(`GRANT ${permisosSQL.join(',')} on ${tablasIntermedia[0]} to ${infoUsuario.nombreUsuario}`)


      }
      if (permisosSQL.includes('Select')) {
        console.log('Agregar Select Vista Tabla', tabla)
        await conexion.request().query(`GRANT Select on v${tabla} to ${infoUsuario.nombreUsuario}`)
        const tablasIntermedia = esquemaDb.esquema[tabla]
        for (const tablaIntermedia of tablasIntermedia) {
          if (tablaIntermedia.length === 0) continue
          console.log('Agregando Select Vistas a tablas intermedia', tablaIntermedia)
          await conexion.request().query(`GRANT Select on v${tablaIntermedia} to ${infoUsuario.nombreUsuario}`)
          
        }
        console.log('Termino Tablas Intermedias')
      }
    }
    console.log('Termino las tablas')

    evento.reply('update-usuario-permisos-reply',{ok:true})
  } catch (e) {
    console.log(e)
    evento.reply('update-usuario-permisos-reply', e)
  }
})
ipcMain.on('delete-usuario', async (evento, idUsuario) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    console.log(idUsuario)
    const infoUsuarioRecord = await conexion.request().query(`Select nombreUsuario from Usuario where IdUsuario = ${idUsuario}`)
    const deleted = await conexion.request().query(`Delete from Usuario where IdUsuario = ${idUsuario}`)
    const infoUsuario = infoUsuarioRecord.recordset[0]
    await conexion.request().query(`Drop Login ${infoUsuario.nombreUsuario}`)
    await conexion.request().query(`Drop user ${infoUsuario.nombreUsuario}`)
    evento.reply('delete-usuario-reply',{ok: true})

  } catch (e) {
    console.log(e)
    evento.reply('delete-usuario-reply',e)
  }
})

ipcMain.on('get-usuarios', async (event, request) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const usuariosRecordset = await conexion.request().query(`Select * from vUsuario`)
    console.log(usuariosRecordset)
    const response = usuariosRecordset.recordset
    event.reply('get-usuarios-reply', response)
  } catch (e) {
    event.reply('get-usuarios-reply',e)
  }
})

ipcMain.on('get-user-detalle', async (event, idUsuario) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const usuariosRecordset = await conexion.request().query(`Select * from vUsuario where IdUsuario = ${idUsuario}`)
    console.log(usuariosRecordset)
    const dataUsuario = usuariosRecordset.recordset[0]
    const permisosUsuarioRecordet = await conexion.request().query(`Select * from vUsuario_Permiso where idUsuario = ${idUsuario}`)
    const permisosUsuario = permisosUsuarioRecordet.recordset.reduce((acc, current) => {
      console.log('Before ', acc)
      acc[current.tabla] = current.crud
      return acc
    }, {})
    const response = { ...dataUsuario, permisos: permisosUsuario }
    
    event.reply('get-user-detalle-reply', response)
  } catch (e) {
    event.reply('get-user-detalle-reply', e)
  }
})

ipcMain.on('create-inventario', async (evento, request) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    await conexion.request().query(`Insert into Inventario values('${request.ingrediente}',${request.idUnidad}, ${request.cantidad})`)
    evento.reply('create-inventario-reply',{ok:true})
  } catch (e) {
    console.log(e)
    evento.reply('create-inventario-reply',{ok: false, e})
  }
})

ipcMain.on('update-platillo-detalle', async (evento, request) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const { ingredientes, ...infoPlatillo } = request
    console.log(ingredientes)
    const ingredientesQuery = []
    for (const ingredientePlatillo of ingredientes) { 
      ingredientesQuery.push(conexion.request().query(`
        Update  Platillo_Ingrediente set idInventario = ${ingredientePlatillo.IdInventario}, idUnidad = ${ingredientePlatillo.IdUnidad},
        cantidad=${ingredientePlatillo.cantidad} where IdPlatilloIngrediente = ${ingredientePlatillo.IdPlatilloIngrediente}
      `))
    }
    const platilloRecordset = await conexion.request().query(`Update Platillo set nombre='${infoPlatillo.nombre}', porcentajeDescuento=${infoPlatillo.porcentajeDescuento},
    precio=${infoPlatillo.precio} where IdPlatillo=${infoPlatillo.IdPlatillo}`)
    await Promise.all(ingredientesQuery)
    evento.reply('update-platillo-detalle-reply',{ok: true})
  } catch (e) {
    console.log(e)
    evento.reply('update-platillo-detalle-reply', { ok: false, e })
  }
})


ipcMain.on('get-inventario-historico', async (evento, request) => {
  try {
    const conexion = connecionDb.getConeccion()
    await conexion
    const inventarioRecordset = await conexion.request().query(`
    Select * from vInventarioHistorico`)
    evento.reply('get-inventario-historico-reply', inventarioRecordset.recordset)
  } catch (e) {
    evento.reply('get-inventario-historico-reply',e)
  }
})
/// EJEMPLOD DE COMO HACER UNA SOLICITUD AL SQL

/* 



ipcMain.on(nombre del evento, (event, args) => {
  try {
  // Se consigue la coneccion al db
    const conecion = connecionDb.getConeccion()
    // se conecta como tal
    await coneccion.connect()
    // hace la solicutd
    const request = await coneccion.request('Select * from vFacturas')
    // devuelve el valor al front end
    event.reply(resultado)
  } catch (e) {
    console.log(e)
  }
})


En el front end 
Se importa createListener de /utils/events.js
y se usa de la siguiente forma
const listener = createLister(nombreDelEvento, funcion de como recepcionas la respuesta de la solicitud)
esto devuelve un objeto con 3 funciones, send, listener , y clear
Send recibe un varios argumento que es la informacion que se recibe en electron
listener es el receptor de eventos en front end se usa objeto.listener() y ya estuchando
clear elima el receptor de eventos el front end se usar objeto.clera y remueve el listener

*/