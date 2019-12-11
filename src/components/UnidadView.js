import React, { useState, useEffect} from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { addStore } from '../utils/store'
import Zelda from '../utils/Zelda'
import Navbar, { withNavbar } from './Navbar'
import Dialog from './Dialog';





const UnidadView= ({ store, addPermisos }) => { 
    console.log(store.user)
    const  permisoPermicial = {}
   // const permisoPermicial = store.user.permisos.find(el => el.tabla == 'Factura')
    //addPermisos([{tabla: 'Factura', crud: 15}])
    permisoPermicial.crud = 15
    const permisoUnidad = permisoPermicial.crud.toString(2).padStart(4,'0')
    console.log(permisoUnidad)
    const [unidad, setUnidad] = useState([
        {
            IdUnidad: 1,
            Unidad: ''

        }
    ])
    const listener = createListener('get-unidad', (event, data) => {
        
        setUnidad(data)
        
        
    })
    useListener(listener,unidad)
    useEffect(() => {
       listener.send()
    }, [])
    console.log(permisoUnidad)
    return (
      <>
        <div>
            <div><h1 className="UnidadH1">Factura</h1></div>

            <div>
                
                {
                    unidad.map((unidad) => (
                        <div className="ver">
                            <div >
                               <p className="name"> IdUnidad: <label className="verfactura"> {unidad.IdUnidad} </label></p>
                               <p className="namecan">Unidad: <label className="verfactura"> {unidad.unidad}  </label></p>

                            </div>
                            <div className className="botoncitosprueba">

                            <span className="pruebaact">
                                    {permisoUnidad[1] == '1' ? <Zelda className="nosee" href={`/Unidad/actualizar/${unidad.IdUnidad}`}>Actualizar Unidad</Zelda> : null}</span>
                                <span className="pruebael"> {permisoUnidad[0] == '1' ? <Zelda className="nosee" href={`/Unidad/borrar/${unidad.IdUnidad}`}>Borrar Unidad</Zelda> : null}</span>
                            </div>          
                        </div>
                    ))
                }

            </div>
        </div>
        </>
    )
}

export default withNavbar(addStore(UnidadView))
