import React, { useState, useEffect} from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { addStore } from '../utils/store'
import Zelda from '../utils/Zelda'
import Navbar, { withNavbar } from './Navbar'





const FacturaView = ({ store }) => { 
    console.log(store.user)
    const permisoFactura = store.user.permisos.find( el=> el.tabla = 'Factura').crud.toString(2).padStart(4,'0')
    console.log(permisoFactura)
    const [facturas, setFacturas] = useState([
        {
            IdFactura: 1,
            vendedor: '',
            nombreCliente: '',
            precioTotal: '',
            totalDescontado: '',
            cancelado: 1,
            fecha: ''
        }
    ])
    const listener = createListener('get-facturas', (event, data) => {
        
        setFacturas(data)
        
        
    })
    useListener(listener,facturas)
    useEffect(() => {
       listener.send()
    }, [])
    
    return (
      <>
        <div>
            <div><h1 className="facturah1">Factura</h1></div>

            <div>
                
                {
                    facturas.map((factura) => (
                        <div className="ver">
                            <div >
                               <p className="name">N Factura: <label className="verfactura"> {factura.IdFactura} </label></p>
                                <p className="name">Fecha: <label className="verfactura"> {factura.fecha}  </label></p>
                               <p className="name">Vendedor: <label className="verfactura"> {factura.vendedor}  </label></p>
                               <p className="name">Cliente: <label className="verfactura"> {factura.nombreCliente}  </label> </p>
                               <p className="name">Total: <label className="verfactura"> {factura.precioTotal}  </label></p>
                               <p className="name">Descuento: <label className="verfactura"> {factura.totalDescontado}  </label></p> 
                               <p className="name">Cancelado: <label className="verfactura"> {factura.cancelado}  </label></p> 
                            </div>
                            <div>
                                <span className="detalle">
                                <Zelda className="nosee" href="/Factura/ver/1">Ver Detalle</Zelda> </span>
                                {permisoFactura[1] == '1' ? <Zelda href='/Factura/actualizar'>Actualizar Data</Zelda> : null}
                                {permisoFactura[0] == '1' ? <Zelda href={`/Factura/borrar/${factura.IdFactura}`}>Actualizar Data</Zelda> : null}

                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
        </>
    )
}




export default withNavbar(addStore(FacturaView))