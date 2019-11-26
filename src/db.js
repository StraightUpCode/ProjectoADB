const mssql = require('mssql')
class ConeccionDB {

    constructor() { 
        this.opciones = {
            user: '',
            password: '',
            server: '',
            database: ''
        }
        this.estaConectado = false
        this.coneccion = false
    }

    async setUp(server, database) { 
        this.opciones.server = server
        this.opciones.database = database
    }

    async modificarConfig(nuevaConfig) { 
        Object.assign(this.opciones, nuevaConfig)
        this.coneccion.close()
        await this.crearConeccion()
        return this.getConeccion()

    }

    async loginToDB(user, password) { 
        this.opciones.user = user
        this.opciones.password = password
        await this.crearConeccion()
       
        return  this.getConeccion()
    }
    async crearConeccion() { 
        try {
            console.log(this.opciones)

            this.coneccion = new mssql.ConnectionPool(this.opciones)
            await this.coneccion.connect()
            this.estaConectado = true
            console.log('conectado')
        } catch (e) {
            console.log(e)
        }
    }


    getConeccion() { 
        if (this.estaConectado) {
            return this.coneccion
        } else {
            return false
        }
    }

}
module.exports = ConeccionDB



