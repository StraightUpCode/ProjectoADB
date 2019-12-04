const electron = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");
const DB_DAO = require('./db')
const connecionDb = new DB_DAO()
const store = require('./store')
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
    if (result) {
      e.reply('set-conection-reply', true)
      store.set({
        db_host: objetoConeccion.server,
        db_name: objetoConeccion.database
      })
    }
  } catch (error) {
    e.reply('set-conection-reply', false)
  }
})

ipcMain.on('registrar-usuario', async (event, nuevoUsuario) => {
  const { permisos, ...infoUsuario } = nuevoUsuario
  try {
    console.log(infoUsuario)
    const conexion = connecionDb.getConeccion()
    await conexion
    const solicitudesPermisos = []
    for (const tabla in permisos) {
      console.log(tabla)
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