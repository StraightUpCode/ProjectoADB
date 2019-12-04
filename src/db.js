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

        if(this.estaConectado) this.coneccion.close()
        await this.crearConeccion()
        return  this.getConeccion()
    }
    async crearConeccion() { 
        try {
            this.coneccion = new mssql.ConnectionPool(this.opciones)
            this.coneccion.close()
            const something = await this.coneccion.connect()
            if (something) {
                
                this.estaConectado = true
                console.log('Conectado')
            }
        } catch (e) {
            this.coneccion.close()
            console.log(e)
           throw e
        }
    }


    getConeccion() { 
        if (this.estaConectado) {
            return this.coneccion
        } else {
            
            return false
        }
    }

    async testConeccion({ server, database, user, password}) { 
        try {
            const pool = await new mssql.connect({
                server,
                database,
                user,
                password
            })
            if(pool) return true
        } catch (error) { 
            return false
        }
    }

}
module.exports = ConeccionDB



