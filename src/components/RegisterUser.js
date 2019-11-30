import React from 'react'
import useForm from './hooks/useForm'
import Permisos from './Permisos'

const RegistrarUsuario = (props) => {
    const [formData, handleChange] = useForm({
        username: '',
        password: '',
        nombre: '',
        apellido: '',
        permisos: {}
    })
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