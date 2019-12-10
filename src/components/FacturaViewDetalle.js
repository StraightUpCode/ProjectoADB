import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import useListener from './hooks/useListener'
import { withNavbar } from './Navbar'
import{createListener} from '../utils/events'

const FacturaConDetalle = () => {
    const { id } = useParams()
    const [factura, setFactura] = useState({
        IdFactura: 1,
        fecha: '',
        vendedor: '',
        nombreCliente: '',
        precioTotal:0,
        totalDescontado: 0,
        cancelado: true,
        detalleFactura: [
            {
              IdFactura: 1,
              IdDetalleFactura: 1,
              idPlatillo: 1,
              platillo: '',
              cantidad: 0,
              precio: 0,
              subtotal: 0,
                valorDescontado: 0
            },
      ]
    })

    const listenerFacturaDetalle = createListener('get-factura-detalle', (event, respuesta) => {
        setFactura(respuesta)


    })
    useListener(listenerFacturaDetalle)
    useEffect(() => {
        listenerFacturaDetalle.send(id)
    },[])
    return (
        <>
            <div className="ver">
                <div >
                    <p className="name">N Factura: <label className="verfactura"> {factura.IdFactura} </label></p>
                    <p className="name">Fecha: <label className="verfactura"> {factura.fecha}  </label></p>
                    <p className="name">Vendedor: <label className="verfactura"> {factura.vendedor}  </label></p>
                    <p className="name">Cliente: <label className="verfactura"> {factura.nombreCliente}  </label> </p>
                    <p className="name">Total: <label className="verfactura"> {factura.precioTotal}  </label></p>
                    <p className="name">Descuento: <label className="verfactura"> {factura.totalDescontado}  </label></p>
                    <p className="namecan">Cancelado: <label className="verfactura"> {factura.cancelado}  </label></p>
                </div>
                <div>
                    <div> Detalle Factura</div>
                    <div>
                        <div>
                            Platillo
                        </div>
                        <div>
                            Cantidad
                        </div>
                        <div>
                            Precio
                        </div>
                        <div>
                            SubTotal
                        </div>
                        <div>
                            Descontado
                        </div>
                    </div>
                    {factura.detalleFactura.map((detalle) => (
                        <div>
                            <p className="name"><label className="verfactura"> {detalle.platillo} </label></p>
                            <p className="name"><label className="verfactura"> {detalle.cantidad}  </label></p>
                            <p className="name"><label className="verfactura"> {detalle.precio}  </label></p>
                            <p className="name"><label className="verfactura"> {detalle.nombreCliente}  </label> </p>
                            <p className="name"> <label className="verfactura"> {detalle.subtotal}  </label></p>
                            <p className="name"><label className="verfactura"> {detalle.valorDescontado}  </label></p>
                        </div>
                    ))}


                </div>
            </div>
        </>
    )
}
/*<span className="detalle">
                        <Zelda className="nosee" href="/Factura/ver/1">Ver Detalle</Zelda> </span>
                    <span className="actualizar">
                        {permisoFactura[1] == '1' ? <Zelda className="nosee" href={`/Factura/actualizar/${factura.IdFactura}`}>Actualizar Factura</Zelda> : null}</span>
                    <span className="eliminar"> {permisoFactura[0] == '1' ? <Zelda className="nosee" href={`/Factura/borrar/${factura.IdFactura}`}>Borrar Factura</Zelda> : null}</span>
                    */

export default withNavbar(FacturaConDetalle)