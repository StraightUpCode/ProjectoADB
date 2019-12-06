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
  mainWindow.on("closed", () => (mainWindow = null));
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

const setConfig = (objeto) => { 
  store.set(objeto)
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
  try {
    const coneccion = await connecionDb.loginToDB(username, password)
    if (coneccion) {
      e.reply('login-reply', true )
    }
  } catch (error) {
    console.log(error)
    e.reply('login-reply',false)
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

ipcMain.on('registrar-usuario', async (event, nuevoUsuario) => {
  const { permisos, ...infoUsuario } = nuevoUsuario
  const { username, password } = infoUsuario
  const hash = crypto.createHash('sha256')
  try {
    console.log(infoUsuario)
    const conexion = connecionDb.getConeccion()
    await conexion
    const solicitudesPermisos = []
    for (const [tabla, permiso] of Object.entries(permisos)) {
      if(permiso == 0 ) continue
      solicitudesPermisos.push(conexion.request().query(`
      Select IdPermiso
      from Permiso
      where tabla = '${tabla}' and crud = ${permiso}`))
      
    }
    const results = await Promise.all(solicitudesPermisos)
    console.log(results)
    await conexion.request().query(`Create Login ${username} with password = '${password}'`)// Crea Login
    await conexion.request().query(`Create User ${username} for login ${username} `)// 
    const createUserString = `Insert into Usuario values
    ('${username}',CAST(N'${hash.update(password).digest('binary')}' AS BINARY(32)), '${infoUsuario.nombre}','${infoUsuario.apellido}' );
    Select SCOPE_IDENTITY() as id`
    console.log(createUserString)
    const createUserInTable = await conexion.request().query(createUserString)
    const insertQueue = []
    for (const permiso of results) {
      if (permiso.recordset.length == 1) {
        const idPermiso = permiso.recordset[0].IdPermiso
        insertQueue.push(conexion.request().query(`Insert into Usuario_Permiso 
        values(${createUserInTable.recordset[0].id}, ${idPermiso})`))
      }
    }
    try {
      await Promise.all(insertQueue)
    } catch (e) {
      throw e
    }
    // if(array.includes('Select')) => Grant Select on v${tabla}
    // if(array.includes('Insert')) => Grant execture on spInsert${tabla}
    for (const [tabla, permiso] of Object.entries(permisos)) {
      if (permiso == 0) continue
      const permisosSQL = []
      const permisoBinario = permiso.toString(2).padStart(4, '0')
      for (let index = 0; index < permisoBinario.length; index+= 1){
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
        const tablaIntermedia = esquemaDb.esquema[tabla]
        console.log('Agregando permiso a tabla intermedia', tablaIntermedia)
        await conexion.request().query(`GRANT ${permisosSQL.join(',')} on ${tablaIntermedia} to ${username}`)
      }
      if (permisosSQL.includes('Select')) {
        console.log('Agregar Select Vista Tabla', tabla)
        await conexion.request().query(`GRANT Select on v${tabla} to ${username}`)
      }


    }
  } catch (e) {
    console.log(e)
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