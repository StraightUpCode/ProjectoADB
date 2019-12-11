import React, { useState, useEffect } from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { addStore } from '../utils/store'
import Zelda from '../utils/Zelda'
import Navbar, { withNavbar } from './Navbar'
import Dialog from './Dialog';
import {useHistory} from 'react-router-dom'
import useDialog from './hooks/useDialog'


const BackButton = (props) => { 
    const history = useHistory()
    return (
      <a onClick={history.goBack} href="#" className="back" title="Regresar">
        <i class="fas fa-arrow-circle-left"></i>
      </a>
    )
  }



const UsuarioView = ({ store, addPermisos }) => {
    console.log(store.user)
    const permisoPermicial = {}
    // const permisoPermicial = store.user.permisos.find(el => el.tabla == 'Factura')
    //addPermisos([{tabla: 'Factura', crud: 15}])
    permisoPermicial.crud = 15
    const permisoUsuario = permisoPermicial.crud.toString(2).padStart(4, '0')
    console.log(permisoUsuario)
    const [isOpen, toggleOpen] = useDialog()
    const [deletedId, setDeleted] = useState()
    const [usuarios, setUsuarios] = useState([
        {
            IdUsuario: 1,
            nombreUsuario: '',
            nombre: '',
            apellido: ''

        }
    ])
    const listener = createListener('get-usuarios', (event, respuesta) => {
       
        if (respuesta.ok) {

            setUsuarios(respuesta.response)
        }


    })

    const deleteListener = createListener('delete-usuario', (evento, respuesta) => {
        if (respuesta.ok) {
            listener.send()
        }
    })
    useListener(listener, usuarios)
    useEffect(() => {
        listener.send()
    }, [])

    useListener(deleteListener)
    const deleteUsuario = id => () => {
        console.log(id)
       deleteListener.send(id)
    }

    const preDelete = (id) => e => {
        setDeleted(id)
        toggleOpen()
      }
      const confirmarDelete = e => {
        deleteListener.send(deletedId)
        toggleOpen()
    
      }

    console.log('Permiso Usuario', permisoUsuario)
    return (
        <>

        <div className="backi"><BackButton></BackButton></div>
            <div>
                <h1 className="InventarioH1">Usuario</h1>

                <div>

                    {
                        usuarios.map((usuario) => (
                            <div className="ver">
                                <div >
                                    <p className="name"> IdUsuario: <label className="verfactura"> {usuario.IdUsuario} </label></p>
                                    <p className="name">Nombre de Usuario: <label className="verfactura"> {usuario.nombreUsuario}  </label></p>
                                    <p className="name">Nombre: <label className="verfactura"> {usuario.nombre}  </label></p>
                                    <p className="namecan">Apellido: <label className="verfactura"> {usuario.apellido}  </label> </p>
                                </div>
                                <div className="botoncitosprueba">
                                    <span className="prueba">
                                        <Zelda className="nosee" href={`/Usuario/ver/${usuario.IdUsuario}`}>Ver Detalle</Zelda> </span>

                                    <span className="pruebaact">
                                        {permisoUsuario[1] == '1' ? <Zelda className="nosee" href={`/Usuario/actualizar/${usuario.IdUsuario}`}>Actualizar usuario</Zelda> : null}</span>
                                        <span className="pruebael" onClick={preDelete(usuario.IdUsuario)}><a className="borrita"href="#popup1">Borrar Usuario</a></span>

                                    
                                </div>
                            </div>
                        ))
                    }
                    <Dialog isOpen={isOpen}><div id="popup1" className="popuppadre">
              <div className="botonhijo">
                <h2 className="cerrarito">Quiere eliminar este Usuario?</h2>


                {/*Coso para borrar la cosa*/}
                <div className="centrado">
                <span><button onClick={confirmarDelete} className="cambito">Si</button></span>


                <span onClick={toggleOpen}><button className="cambito" >No</button></span></div>
              </div>

            </div></Dialog>

                </div>
            </div>
        </>
    )
}

export default withNavbar(addStore(UsuarioView))
