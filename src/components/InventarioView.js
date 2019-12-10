import React, { useState, useEffect} from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { addStore } from '../utils/store'
import Zelda from '../utils/Zelda'
import Navbar, { withNavbar } from './Navbar'
import Dialog from './Dialog';





const InventarioView= ({ store, addPermisos }) => { 
    console.log(store.user)
    const  permisoPermicial = {}
   // const permisoPermicial = store.user.permisos.find(el => el.tabla == 'Factura')
    //addPermisos([{tabla: 'Factura', crud: 15}])
    permisoPermicial.crud = 15
    const permisoInventario = permisoPermicial.crud.toString(2).padStart(4,'0')
    console.log(permisoInventario)
    const [inventario, setInventario] = useState([
        {
            IdInventario: 1,
            ingrediente: '',
            idUnidad: '',
            cantidad : ''

        }
    ])
    const listener = createListener('get-inventario', (event, data) => {
        console.log(data)
        setInventario(data)
        
        
    })
    useListener(listener,inventario)
    useEffect(() => {
       listener.send()
    }, [])
    console.log(permisoInventario)
    return (
      <>
        <div>
            <h1 className="InventarioH1">Inventario</h1>

            <div>
                
                {
                    inventario.map((inventario) => (
                        <div className="ver">
                            <div >
                               <p className="name"> IdInventario: <label className="verfactura"> {inventario.IdInventario} </label></p>
                               <p className="name">Ingrediente: <label className="verfactura"> {inventario.ingrediente}  </label></p>
                               <p className="name">Unidad: <label className="verfactura"> {inventario.unidad}  </label></p>
                               <p className="namecan">Cantidad: <label className="verfactura"> {inventario.cantidad}  </label> </p>
                            </div>
                            <div>

                            <span className="actuinv">
                                    {permisoInventario[1] == '1' ? <Zelda className="nosee" href={`/Inventario/actualizar/${inventario.IdInventario}`}>Actualizar Inventario</Zelda> : null}</span>
                                <span className="actubor"> {permisoInventario[0] == '1' ? <Zelda className="nosee" href={`/Inventario/borrar/${inventario.IdInventario}`}>Borrar Inventario</Zelda> : null}</span>
                            </div>          
                        </div>
                    ))
                }

            </div>
        </div>
        </>
    )
}

export default withNavbar(addStore(InventarioView))
