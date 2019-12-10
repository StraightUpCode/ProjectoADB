import React, { useState, useEffect} from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { addStore } from '../utils/store'
import Zelda from '../utils/Zelda'
import Navbar, { withNavbar } from './Navbar'
import Dialog from './components/Dialog';





const PlatilloView= ({ store, addPermisos }) => { 
    console.log(store.user)
    const  permisoPermicial = {}
   // const permisoPermicial = store.user.permisos.find(el => el.tabla == 'Factura')
    //addPermisos([{tabla: 'Factura', crud: 15}])
    permisoPermicial.crud = 15
    const permisoFactura = permisoPermicial.crud.toString(2).padStart(4,'0')
    console.log(permisoPlatilo)
    const [platillo, setPlatillo] = useState([
        {
            IdPlatillo: 1,
            nombre: '',
            precio: '',
            porcentajeDescuento : '',

        }
    ])
    const listener = createListener('get-platillos', (event, data) => {
        
        setPlatillo(data)
        
        
    })
    useListener(listener,platillo)
    useEffect(() => {
       listener.send()
    }, [])
    console.log(permisoPlatillo)
    return (
      <>
        <div>
            <div><h1 className="PlatilloH1">Factura</h1></div>

            <div>
                
                {
                    platillo.map((platillo) => (
                        <div className="ver">
                            <div >
                               <p className="name"> IdPlatillo: <label className="verplatillo"> {factura.IdPlatillo} </label></p>
                               <p className="name">Nombre: <label className="verplatillo"> {factura.nombre}  </label></p>
                               <p className="name">Precio: <label className="verplatillo"> {factura.precio}  </label></p>
                               <p className="name">% Descuento: <label className="verplatillo"> {factura.porcentajeDescuento}  </label> </p>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
        </>
    )
}
