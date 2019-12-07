
const { ipcRenderer } = window.require('electron')

export const getDbConfig = () => { 
    const config = ipcRenderer.sendSync('db-config')
    if (config.db_host && config.db_name) return true
    return false
}

export const modificarConfig = async (nuevaConfig) => {
    return await ipcRenderer.send('set-config', nuevaConfig )
}


export const createListener = (nombreEvento, callback) => {
    const eventoReply = `${nombreEvento}-reply`
    return {
        send: (...args) => { 
            console.log(...args)
            ipcRenderer.send(nombreEvento, ...args)
        },
        listener: () => ipcRenderer.on(eventoReply, callback),
        clear: () => ipcRenderer.removeListener(eventoReply, callback)
    }
}
export const loginListener = (replyCallback) => createListener('login', replyCallback)
