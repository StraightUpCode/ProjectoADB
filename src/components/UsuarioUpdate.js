import React, { useState, useEffect } from 'react'
import {useParams } from 'react-router-dom'
import { createListener } from '../utils/events'
import { withNavbar } from './Navbar'
import Permisos from './Permisos'
import useListener from './hooks/useListener'
const UsuarioUpdate = () => {
    const { id } = useParams()
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
            console.log('Update Permisos En Teoria')
        setPermisosUsuario(permisos)
    })
    const listnerUpdateUsuario = createListener('update-usuario-permisos', (event, respuesta) => {
        console.log(respuesta.ok)
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
        console.log(request)
        listnerUpdateUsuario.send(request)
    }

    useListener(listenerInformacionUsuario)
    useListener(listnerUpdateUsuario)
    useEffect(()=> { listenerInformacionUsuario.send(id)},[])
    return (
        <div> 
            <form>
                <label>Nombre Usuario : <input name='nombreUsuario' type='text' onChange={handleInfoUsuario} value={infoUsuario.nombreUsuario}/></label>
                <label>Contrase;a : <input name='contrasena' type='password' onChange={handleInfoUsuario} value={infoUsuario.contrasena}/></label>
                <label>Nombre : <input name='nombre' type='text' onChange={handleInfoUsuario} value={infoUsuario.nombre} /></label>
                <label>Apellido : <input name='apellido' type='text' onChange={handleInfoUsuario} value={infoUsuario.apellido} /></label>
                <Permisos setPermisos={setPermisosUsuario} permisos={permisosUsuario}></Permisos>
            </form>
            <div onClick={saveData}>Guardar</div> 
        </div>
    )


}

export default UsuarioUpdate