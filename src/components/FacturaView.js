import React, { useState, useEffect} from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'




const FacturaView = (props) => { 
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
   },[])
   console.log(facturas)
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
                            <div> {factura.IdFactura} </div>
                            <div> {factura.fecha}  </div>
                            <div> {factura.vendedor}  </div>
                            <div> {factura.nombreCliente}  </div>
                            <div> {factura.precioTotal}  </div>
                            <div> {factura.totalDescontado}  </div>
                            <div> {factura.cancelado}  </div>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default FacturaView