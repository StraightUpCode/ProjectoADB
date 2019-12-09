import React from 'react'
import useForm from './hooks/useForm'
import useListener from './hooks/useListener'
import Permisos from './Permisos'
import {createListener} from '../utils/events'
import { withNavbar } from './Navbar'

const registrarUsuarioListener = createListener('registrar-usuario', (event, respuesta) => {
    console.log(respuesta)
})

const RegistrarUsuario = (props) => {
    const [formData, handleChange, resetFormulario] = useForm({
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
        resetFormulario()
    }
    return (
        <div>
            
            <h1 className="tituloRegistro">Registro</h1>
            <form className="formregister" onSubmit={handleSubmit} >



              <label className="label">Nombre</label>
                    <input placeholder='Nombre'type='text' className="labelinput" name="nombre"
                        value={formData.nombre} onChange={handleChange} /> 
                            <label className="label">Apellido</label>
                <input type='text' placeholder="Apellido" className="labelinput"  name="apellido" 
                    value={formData.apellido} onChange={handleChange}/>
                        <label className="label">UserName</label>
                <input type='text' placeholder="UserName" className="labelinput" name="username"
                    value={formData.username} onChange={handleChange}/>  
                        <label className="label">Password</label>
                    <input type='password' placeholder="Password" className="labelinput" name="password" 
                    value={formData.password} onChange={handleChange}/>
                        <Permisos setPermisos={handlePermisos}/>
                <input  type='submit' className="entercheck" ></input> 
          
            </form>
          
        </div>
    )

}

export default withNavbar(RegistrarUsuario)