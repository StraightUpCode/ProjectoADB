const { ipcRenderer } = window.require('electron')


export const getDbConfig = () => { 
    return ipcRenderer.sendSync('db-config')
}

export const modificarConfig = async (nuevaConfig) => {
    return await ipcRenderer.send('set-config', nuevaConfig )
}

export const sendLoginData = (username, password) => {
    console.log(username, password)
    ipcRenderer.sendSync('login',username,password)
}

