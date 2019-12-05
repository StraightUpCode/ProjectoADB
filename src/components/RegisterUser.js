import React from 'react'
import useForm from './hooks/useForm'
import useListener from './hooks/useListener'
import Permisos from './Permisos'
import {createListener} from '../utils/events'

const registrarUsuarioListener = createListener('registrar-usuario', (event, respuesta) => {
    console.log(respuesta)
})

const RegistrarUsuario = (props) => {
    const [formData, handleChange] = useForm({
        username: 'lmao',
        password: 'Roberto4$',
        nombre: 'Roberto',
        apellido: 'Sanchez',
        permisos: {}
    })
    useListener(registrarUsuarioListener)
    const handlePermisos = permisos => {
        console.log(permisos)
        const permiso = {
            target: {
                name: 'permisos', value: permisos
            },
            
        }
        handleChange(permiso)
    }
    const handleSubmit = e => {
        console.log(formData)
        registrarUsuarioListener.send(formData)
        e.preventDefault()
    }
    return (
        <div>
            
            <h1 className="tituloRegistro">Registro</h1>
            <form className="formregister" onSubmit={handleSubmit} >
              <label className="label">Nombre</label>
                    <input placeholder='Nombre'type='text' className="labelinput" name="nombre"
                        value={formData.nombre} onChange={handleChange} /> 
                            <label className="label">Apellido</label>
                <input type='text' className="labelinput"  name="apellido" 
                    value={formData.apellido} onChange={handleChange}/>
                        <label className="label">UserName</label>
                <input type='text' className="labelinput" name="username"
                    value={formData.username} onChange={handleChange}/>  
                        <label className="label">Password</label>
                    <input type='password' className="labelinput" name="password" 
                    value={formData.password} onChange={handleChange}/>
                        <Permisos setPermisos={handlePermisos}/>
                <input type='submit' className="enter" ></input> 
          
            </form>
          
        </div>
    )

}

export default RegistrarUsuario