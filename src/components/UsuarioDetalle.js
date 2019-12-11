import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { withNavbar } from './Navbar'
import { addStore } from '../utils/store'
import {useHistory} from 'react-router-dom'



const BackButton = (props) => { 
    const history = useHistory()
    return (
      <a onClick={history.goBack} href="#" className="back" title="Regresar">
        <i class="fas fa-arrow-circle-left"></i>
      </a>
    )
  }


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
        if (respuesta.ok) {
            setData(respuesta.response)
        }
    })
    useEffect(() => {
        userDataListener.send(id)
    },[])
    useListener(userDataListener)
    return ( 
        <>

        <div className="backi"><BackButton></BackButton></div>
            <div className="verdetallito" >
               
                <div>
                    <p className="name"> IdUsuario: <label className="verfactura"> {usuarioData.IdUsuario} </label></p>
                    <p className="name">Nombre de Usuario: <label className="verfactura"> {usuarioData.nombreUsuario}  </label></p>
                    <p className="name">Nombre: <label className="verfactura"> {usuarioData.nombre}  </label></p>
                    <p className="namecan">Apellido: <label className="verfactura"> {usuarioData.apellido}  </label> </p>
                </div>
                <table className="tablefactura">
                     
                <thead>
                    <tr>
                        <th>Tabla</th>
                        <th>Lectura</th>
                        <th>Escritura</th>
                        <th>Actualizar</th>
                        <th>Borrar</th></tr>
                </thead>
                <tbody>
                    {Object.entries(usuarioData.permisos).map(([llave, valor]) => {
                        return (
                            <tr>
                                <th>{llave}</th>
                                {valor.toString(2).padStart(4, '0').split('').reverse().map((bit) => {
                                   return( <td className="verfactura">{bit} </td>)

                                })}

                            </tr>
                        )
                })}

</tbody>
                </table>
            </div>
        </>
    )
}

export default withNavbar(addStore(UsuarioDetalle))