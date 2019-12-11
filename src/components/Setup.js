import React, { useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import { createListener , setConeccionStatus} from '../utils/events'
import useListener from './hooks/useListener'
import useForm from './hooks/useForm'
import ErrorComponent from './ErrorComponent'


const testConeccionListener = (history, setValidDb, handleError) => createListener('set-conection', (event, coneccion) => {
    console.log(coneccion)
    setValidDb(coneccion)
    console.log(coneccion)
    if (coneccion.ok) {
        history.push('/')
    } else {
        handleError(true)
    }
})
const Setup = ({setDb}) => {
    const history = useHistory()
    const [coneccion, handleCredenciales] = useForm({
        server: '',
        database: '',
        user: '',
        password: ''
    })
    const [ error, setError ] = useState()

    const listener = testConeccionListener(history,setDb,setError)
    useListener(listener)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        listener.send(coneccion)
    }
    return (
        <div className="ui container">
            <h1 className="tituloSetup">Setup</h1>
            <form className="formregister" onSubmit={handleSubmit}>
                <label className="label">Server</label>
                <input className="labelinput" type="text" placeholder='server' name='server' value={coneccion.server} onChange={handleCredenciales} ></input>
                <label className="label">Database Name</label>
                <input className="labelinput" type="text" placeholder='database name' name="database" value={coneccion.database} onChange={handleCredenciales} ></input>
                <label className="label">Usuario de SQL</label>
                <input className="labelinput" type="text" placeholder='SQL Login User' name='user' value={coneccion.user} onChange={handleCredenciales} ></input>
                <label className="label">Password</label>
                <input className="labelinput" type="password" placeholder='SQL Login Password' name="password" value={coneccion.password} onChange={handleCredenciales} ></input>
                <input className="enter" type="submit" value="Submit" />
            </form>
            {error ? (
                <div>
                    Revise la coneccion o el Usuario
                </div>
            ) : null}

        </div>
    )
}

export default Setup