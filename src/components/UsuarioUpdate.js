import React, { useState } from 'react'
import {useParams } from 'react-router-dom'
import { createListener } from '../utils/events'

const UsuarioUpdate = () => {
    const [infoUsuario, setInfoUsuario] = useState(
        {
            nombreUsuario: '',
            contrasena: '',
            nombre: '',
            apellido: ''
        }
    )
    
    const [permisosUsuario, setPermisosUsuario] = useState({

    })

    const listenerInformacionUsuario = createListener('get-usuario-permisos', (event, respuesta) => {
        const { permisos, ...infoUsuario } = respuesta
        setInfoUsuario(infoUsuario),
        setPermisosUsuario(permisos)
    })

    const handleInfoUsuario = (e) => {
        const newInfoUsuario = {
            ...infoUsuario,
            [e.target.name] : e.target.value
        }
        setInfoUsuario(newInfoUsuario)
    }

    const saveData = () => { 
        const request = { ...infoUsuario, permisosUsuario }
        listenerInformacionUsuario.send(request)
    }

    return (
        <div> 
            <form>
                <label>Nombre Usuario : <input name='nombreUsuario' type='text' onChange={handleInfoUsuario} value={infoUsuario.nombreUsuario}/></label>
                <label>Contrase;a : <input name='contrasena' type='password' onChange={handleInfoUsuario} value={infoUsuario.contrasena}/></label>
                <label>Nombre : <input name='nombre' type='text' onChange={handleInfoUsuario} value={infoUsuario.nombre} /></label>
                <label>Apellido : <input name='apellido' type='text' onChange={handleInfoUsuario} value={infoUsuario.apellido} /></label>
                <Permisos setPermisos={setPermisosUsuario} permisos={permisosUsuario}></Permisos>
            </form>
            <div>Guardar</div> 
        </div>
    )


}


