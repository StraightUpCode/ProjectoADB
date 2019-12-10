import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { withNavbar } from './Navbar'


const UsuarioDetalle = (props) => {
    const {id} = useParams()
    const [usuarioData, setData] = useState({
        IdUsuario: 1,
        nombre: '',
        apellido: '',
        contrasena: '',
        permisos: {
            Factura: 0,
            Inventario: 0,
            Usuario: 0,
            Platillo: 0,

        }
    })

    const userDataListener = createListener('get-user-detalle', (evento, respuesta) => {
        setData(respuesta)
    })
    useEffect(() => {
        userDataListener.send(id)
    },[])
    useListener(userDataListener)
    return ( 
        <>
            <div>
                <div> Usuario</div>
                <div>
                    <p className="name"> IdUsuario: <label className="verinventario"> {usuarioData.IdUsuario} </label></p>
                    <p className="name">Nombre de Usuario: <label className="verinventario"> {usuarioData.nombreUsuario}  </label></p>
                    <p className="name">Nombre: <label className="verinventario"> {usuarioData.nombre}  </label></p>
                    <p className="name">Apellido: <label className="verinventario"> {usuarioData.apellido}  </label> </p>
                </div>
                <div>
                    Permisos 
                <div>
                        <div>Tabla</div>
                        <div>Lectura</div>
                        <div>Escritura</div>
                        <div>Actualizar</div>
                        <div>Borrar</div>
                </div>
                    {Object.entries(usuarioData.permisos).map(([llave, valor]) => {
                        return (
                            <div>
                                <div>{llave}</div>
                                {valor.toString(2).padStart(4, '0').split('').reverse().map((bit) => {
                                   return( <div>{bit} </div>)

                                })}

                            </div>
                        )
                })}
                </div>
            </div>
        </>
    )
}

export default UsuarioDetalle