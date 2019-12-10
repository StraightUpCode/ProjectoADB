import React, { useState, useEffect} from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { addStore } from '../utils/store'
import Zelda from '../utils/Zelda'
import Navbar, { withNavbar } from './Navbar'
import Dialog from './Dialog';





const PlatilloView= ({ store }) => { 
    console.log(store.user)
    const  permisoPermicial = {}
   // const permisoPermicial = store.user.permisos.find(el => el.tabla == 'Factura')
    //addPermisos([{tabla: 'Factura', crud: 15}])
    permisoPermicial.crud = 15
    const permisoPlatillo = permisoPermicial.crud.toString(2).padStart(4,'0')
    console.log(permisoPlatillo)
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
                                <p className="name"> IdPlatillo: <label className="verfactura"> {platillo.IdPlatillo} </label></p>
                                <p className="name">Nombre: <label className="verfactura"> {platillo.nombre}  </label></p>
                                <p className="name">Precio: <label className="verfactura"> {platillo.precio}  </label></p>
                                <p className="namecan">% Descuento: <label className="verfactura"> {platillo.porcentajeDescuento}  </label> </p>
                            </div>
                            <div className="botoncitosprueba">
                                <span className="prueba">
                                    <Zelda className="nosee" href={`/Platillo/ver/${platillo.IdPlatillo}`}>Ver Detalle</Zelda> </span>
                                <span className="pruebaact">
                                    {permisoPlatillo[1] == '1' ? <Zelda className="nosee" href={`/Platillo/actualizar/${platillo.IdFactura}`}>Actualizar Platillo</Zelda> : null}</span>
                                <span className="pruebael"> {permisoPlatillo[0] == '1' ? <Zelda className="nosee" href={`/Platillo/borrar/${platillo.IdFactura}`}>Borrar Platillo</Zelda> : null}</span>


                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
        </>
    )
}


export default withNavbar(addStore(PlatilloView))