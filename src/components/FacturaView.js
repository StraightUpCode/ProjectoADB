import React, { useState, useEffect} from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { addStore } from '../utils/store'
import Zelda from '../utils/Zelda'




const FacturaView = ({ store }) => { 
    const permisoFactura = store.user.permisos.find( el=> el.tabla = 'factura').crud.toString(2).padStart(4,'0')
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
        <div>
            <div><h1>Factura</h1></div>

            <div>
                <div> 
                    <div> N Factura </div>
                    <div> Fecha </div>
                    <div> Vendedor </div>
                    <div> Cliente </div>
                    <div> Total </div>
                    <div> Descuento </div>
                    <div> Cancelado </div>
                </div>
                {
                    facturas.map((factura) => (
                        <div>
                            <div>
                                <div> {factura.IdFactura} </div>
                                <div> {factura.fecha}  </div>
                                <div> {factura.vendedor}  </div>
                                <div> {factura.nombreCliente}  </div>
                                <div> {factura.precioTotal}  </div>
                                <div> {factura.totalDescontado}  </div>
                                <div> {factura.cancelado}  </div>
                            </div>
                            <div>
                                Menu
                                <Zelda href="/Factura/ver/1"> Ver Detalle</Zelda>
                                {permisoFactura[1] == '1' ? <Zelda href='/Factura/actualizar'>Actualizar Data</Zelda> : null}
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default addStore(FacturaView)