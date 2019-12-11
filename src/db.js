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
            if (this.coneccion) {
                this.coneccion.close()
                console.log('Cerrando Conexion previa')

            }

            this.coneccion = new mssql.ConnectionPool(this.opciones)
            const something = await this.coneccion.connect() 
            console.log('Conecto nueva conexion')
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
            const pool = await new mssql.ConnectionPool({
                server,
                database,
                user,
                password
            })
            pool.close()
            const conecto = await pool.connect()
            if (conecto) {
                return conectado
            }
        } catch (error) { 
            console.log(error)
            return false
        }
    }

    async conectarAMaster() {
        const config = { ...this.opciones, ...{ database: 'master' } }
        const nuevaConexion = new mssql.ConnectionPool(config)
        const conecto = await nuevaConexion.connect()
        if (conecto) return nuevaConexion
       
    }

}
module.exports = ConeccionDB



