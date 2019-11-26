const ElectronStore = require('electron-store')
const storeSchema = {
    db_host: {
        type: 'string',
        format: 'url'
    },
    db_name: {
        type: 'string'
    },
    empresa: {
        type: 'object',
        properties: {
            nombre: { type: 'string' },
            direccion: {type: 'string'}
        },
        required: [ 'nombre','direccion']
    }

}

const store = new ElectronStore(storeSchema)

module.exports = store