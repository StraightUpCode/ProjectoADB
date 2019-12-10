import React, { useState, useEffect } from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { addStore } from '../utils/store'
import Zelda from '../utils/Zelda'
import Navbar, { withNavbar } from './Navbar'
import Dialog from './Dialog';





const UsuarioView = ({ store, addPermisos }) => {
    console.log(store.user)
    const permisoPermicial = {}
    // const permisoPermicial = store.user.permisos.find(el => el.tabla == 'Factura')
    //addPermisos([{tabla: 'Factura', crud: 15}])
    permisoPermicial.crud = 15
    const permisoUsuario = permisoPermicial.crud.toString(2).padStart(4, '0')
    console.log(permisoUsuario)
    const [usuarios, setUsuarios] = useState([
        {
            IdUsuario: 1,
            nombreUsuario: '',
            nombre: '',
            apellido: ''

        }
    ])
    const listener = createListener('get-usuarios', (event, data) => {
        console.log(data)

        setUsuarios(data)


    })
    useListener(listener, usuarios)
    useEffect(() => {
        listener.send()
    }, [])
    console.log('Permiso Usuario', permisoUsuario)
    return (
        <>
            <div>
                <h1 className="InventarioH1">Usuario</h1>

                <div>

                    {
                        usuarios.map((usuario) => (
                            <div className="ver">
                                <div >
                                    <p className="name"> IdUsuario: <label className="verinventario"> {usuario.IdUsuario} </label></p>
                                    <p className="name">Nombre de Usuario: <label className="verinventario"> {usuario.nombreUsuario}  </label></p>
                                    <p className="name">Nombre: <label className="verinventario"> {usuario.nombre}  </label></p>
                                    <p className="name">Apellido: <label className="verinventario"> {usuario.apellido}  </label> </p>
                                </div>
                                <div>
                                    <span className="detalle">
                                        <Zelda className="nosee" href={`/Usuario/ver/${usuario.IdUsuario}`}>Ver Detalle</Zelda> </span>

                                    <span className="actuinv">
                                        {permisoUsuario[1] == '1' ? <Zelda className="nosee" href={`/Usuario/actualizar/${usuario.IdUsuario}`}>Actualizar usuario</Zelda> : null}</span>
                                    <span className="actubor"> {permisoUsuario[0] == '1' ? <Zelda className="nosee" href={`/Usuario/borrar/${usuario.IdUsuario}`}>Borrar usuario</Zelda> : null}</span>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}

export default withNavbar(addStore(UsuarioView))
