import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useListener from './hooks/useListener'
import { withNavbar } from './Navbar'
import { createListener } from '../utils/events'
import { useHistory } from 'react-router-dom'

const BackButton = (props) => {
    const history = useHistory()
    return (
        <a onClick={history.goBack} href="#" className="back" title="Regresar">
            <i class="fas fa-arrow-circle-left"></i>
        </a>
    )
}

const PlatilloDetalle = () => {
    const { id } = useParams()
    const [platillo, setPlatillo] = useState({
        IdPlatillo: 1,
        nombre: '',
        precio: 0,
        porcentajeDescuento: 0,
        ingredientes: [
            {
                IdPlatilloIngrediente: 1,
                ingrediente: '',
                cantidad: 0,
                unidad: '',
                IdPlatillo: 0,
            },
        ]
    })

    const listenerPlatilloDetalle = createListener('get-platillo-detalle', (event, respuesta) => {
        setPlatillo(respuesta)

    })
    useListener(listenerPlatilloDetalle)
    useEffect(() => {
        listenerPlatilloDetalle.send(id)
    }, [])
    return (
        <>

            <div className="backi">
                <BackButton></BackButton>
            </div>
            <div className="verdetallito">
                <div >
                    <p className="name">Platillo: <label className="verfactura"> {platillo.nombre} </label></p>
                    <p className="name">Precio: <label className="verfactura"> {platillo.precio}  </label></p>
                    <p className="name">Decuento: <label className="verfactura"> {platillo.porcentajeDescuento}%  </label></p>
                </div>
                <table className="tablefactura">

                    <thead>
                        <tr >
                            <th>
                                Ingrediente</th>

                            <th>
                                Cantidad</th>

                            <th>
                                Unidad</th>

                        </tr>
                    </thead>
                    <tbody>
                        {platillo.ingredientes.map((ingrediente) => (
                            <tr>
                                <td className="verfactura"> {ingrediente.ingrediente} </td>
                                <td className="verfactura"> {ingrediente.cantidad}  </td>
                                <td className="verfactura"> {ingrediente.unidad}  </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </>
    )
}
/*<span className="detalle">
                        <Zelda className="nosee" href="/platillo/ver/1">Ver Detalle</Zelda> </span>
                    <span className="actualizar">
                        {permisoFactura[1] == '1' ? <Zelda className="nosee" href={`/platillo/actualizar/${platillo.IdFactura}`}>Actualizar platillo</Zelda> : null}</span>
                    <span className="eliminar"> {permisoFactura[0] == '1' ? <Zelda className="nosee" href={`/platillo/borrar/${platillo.IdFactura}`}>Borrar platillo</Zelda> : null}</span>
                    */

export default withNavbar(PlatilloDetalle)