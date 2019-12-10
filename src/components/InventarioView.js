import React, { useState, useEffect} from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { addStore } from '../utils/store'
import Zelda from '../utils/Zelda'
import Navbar, { withNavbar } from './Navbar'
import Dialog from './components/Dialog';





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
            cantidad : '',

        }
    ])
    const listener = createListener('get-Inventario', (event, data) => {
        
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
            <div><h1 className="InventarioH1">Factura</h1></div>

            <div>
                
                {
                    inventario.map((inventario) => (
                        <div className="ver">
                            <div >
                               <p className="name"> IdInventario: <label className="verinventario"> {inventario.IdInventario} </label></p>
                               <p className="name">Ingrediente: <label className="verinventario"> {inventario.ingrediente}  </label></p>
                               <p className="name">idUnidad: <label className="verinventario"> {inventario.idUnidad}  </label></p>
                               <p className="name">Cantidad: <label className="verinventario"> {inventario.cantidad}  </label> </p>
                            </div>
                            <div>

                            <span className="actualizar">
                            {permisoInventario[1] == '1' ? <Zelda className="dunno" href={`/Inventario/actualizar/${}`}>Actualizar Inventario</Zelda> : null}</span>
                            <span className="eliminar"> {permisoInventario[0] == '1' ? <Zelda className="nosee" href={`/Inventario/borrar/${}`}>Borrar Inventario</Zelda> : null}</span>
                            </div>          
                        </div>
                    ))
                }

            </div>
        </div>
        </>
    )
}
