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
            
            <p className="Registro">Registro</p>

            <form className="formregister" onSubmit={handleSubmit} >
                <input type='text' className="label" name="nombre" 
                    value={formData.nombre} onChange={handleChange}/> 
                <label for="" className="labelinput">Nombre</label>   
                <input type='text' className="label"  name="apellido" 
                    value={formData.apellido} onChange={handleChange}/> 
                    <label for="" className="labelinput">Apellido</label>   
                <input type='text' className="label" name="username"
                    value={formData.username} onChange={handleChange}/>  
                    <label for="" className="labelinput">Usuario</label>   
                <input type='password' className="label" name="password" 
                    value={formData.password} onChange={handleChange}/>
                    <label for="" className="labelinput">Contraseña</label>   
                <Permisos setPermisos={handlePermisos}/>
                <input type='submit' className="enter" ></input> 
          
            </form>
          
        </div>
    )

}

export default RegistrarUsuario