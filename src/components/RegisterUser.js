import React from 'react'
import useForm from './hooks/useForm'
import useListener from './hooks/userListener'
import Permisos from './Permisos'
import {createListener} from '../utils/events'

const registrarUsuarioListener = createListener('registrar-usuario', (event, respuesta) => {
    console.log(respuesta)
})

const RegistrarUsuario = (props) => {
    const [formData, handleChange] = useForm({
        username: '',
        password: '',
        nombre: '',
        apellido: '',
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
            <p>'Hi</p>
            <form onSubmit={handleSubmit}>
                <input type='text' name="nombre" placeholder="Nombre"
                    value={formData.nombre} onChange={handleChange}/> 
                <input type='text' name="apellido" placeholder="Apellido"
                    value={formData.apellido} onChange={handleChange}/> 
                <input type='text' name="username" placeholder="Usuario"
                    value={formData.username} onChange={handleChange}/>  
                <input type='password' name="password" placeholder="Contrase;a"
                    value={formData.password} onChange={handleChange}/>
                <Permisos setPermisos={handlePermisos}/>
                <input type='submit' ></input> 
            </form>
        </div>
    )

}

export default RegistrarUsuario