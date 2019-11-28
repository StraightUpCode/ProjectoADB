import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { createListener , setConeccionStatus} from '../utils/events'


const testConeccionListener = (history) => createListener('set-conection', (event, coneccion) => {
    setConeccionStatus(coneccion)
    console.log(coneccion)
    if (coneccion) {

        history.push('/')
    }
})
const Setup = (props) => {
    const history = useHistory()
    const [coneccion, setConeccionData] = useState({
        server: 'localhost',
        database: 'projecto',
        user: 'sa',
        password: 'Roberto4$'
    })

    const handleCredenciales = (e) => setConeccionData({
        ...coneccion,
        [e.target.name]: e.target.value
    })
    const listener = testConeccionListener(history)
    useEffect(() => {
        listener.listener()
        return () => listener.clear()
    })
    
    const handleSubmit = (e) => {
        e.preventDefault()
        listener.send(coneccion)
    }
    return (
        <div className="ui container">
            <h1>Setup</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='server' name='server' value={coneccion.server} onChange={handleCredenciales} ></input>
                <input type="text" placeholder='database name' name="database" value={coneccion.database} onChange={handleCredenciales} ></input>
                <input type="text" placeholder='SQL Login User' name='user' value={coneccion.user} onChange={handleCredenciales} ></input>
                <input type="password" placeholder='SQL Login Password' name="password" value={coneccion.password} onChange={handleCredenciales} ></input>
                <input type="submit" value="Submit" />
            </form>

        </div>
    )
}

export default Setup