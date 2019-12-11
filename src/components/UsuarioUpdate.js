import React, { useState, useEffect } from 'react'
import {useParams } from 'react-router-dom'
import { createListener } from '../utils/events'
import { withNavbar } from './Navbar'
import Permisos from './Permisos'
import useListener from './hooks/useListener'
import {useHistory} from 'react-router-dom'
import { addStore } from '../utils/store'



const BackButton = (props) => { 
    const history = useHistory()
    return (
      <a onClick={history.goBack} href="#" className="back" title="Regresar">
        <i class="fas fa-arrow-circle-left"></i>
      </a>
    )
  }


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
        if (respuesta.ok) {
            const { permisos, ...infoUsuario } = respuesta.response
            setInfoUsuario(infoUsuario)
                console.log('Update Permisos En Teoria')
            setPermisosUsuario(permisos)
        }
    })
    const listnerUpdateUsuario = createListener('update-usuario-permisos', (event, respuesta) => {
        if (respuesta.ok) {
            //hacer algo
        }
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
        <>
        <div className="backi"><BackButton></BackButton></div>
        <div> 
            <h1 className="updateuser">Actualizar Usuario</h1>
            <form className="formregister">
                <label className="label">Nombre Usuario <input className="labelinput" name='nombreUsuario' type='text' onChange={handleInfoUsuario} value={infoUsuario.nombreUsuario}/></label>
                <label className="label">Contraseña <input className="labelinput" name='contrasena' type='password' onChange={handleInfoUsuario} value={infoUsuario.contrasena}/></label>
                <label className="label">Nombre <input  className="labelinput" name='nombre' type='text' onChange={handleInfoUsuario} value={infoUsuario.nombre} /></label>
                <label className="label">Apellido <input  className="labelinput" name='apellido' type='text' onChange={handleInfoUsuario} value={infoUsuario.apellido} /></label>
                <Permisos setPermisos={setPermisosUsuario} permisos={permisosUsuario}></Permisos>
                <div className="agregar" onClick={saveData}>Guardar</div> 
            </form>
            
        </div>
        </>
    )


}

export default withNavbar(addStore(UsuarioUpdate))