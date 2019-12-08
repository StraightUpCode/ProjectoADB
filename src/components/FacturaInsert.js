import React, { useState, useEffect } from 'react'
import useListener from './hooks/useListener'
import { createListener } from '../utils/events'
import useForm from './hooks/useForm'
import { parse } from 'path'

const FacturaInsertar = (props) => { 
    const [nombreCliente, setNombreCliente] = useState('')
    const [platillos, setPlatillo] = useState([])
    const [detalleFactura, setDetalleFactura] = useState([])
    const [formData, handleChange] = useForm({
        indexPlatillo: 0,
        cantidad: 0
    })
    console.log

    const addPlatillo = () => { 
        const cantidadPlatillo = parseInt(formData.cantidad)
        const platillo = platillos[parseInt(formData.indexPlatillo)]
        console.log(platillo)
        const detalleAIngresar = {
            ...platillo,
            cantidad: cantidadPlatillo,
            cantidadAPagar : cantidadPlatillo * platillo.precio,
           // valorDescontado: platillo.precio * cantidadPlatillo * ((platillo.porcentajeDescuento / 100) || 1)
        }
        const nuevoDetalleFactura = [...detalleFactura, detalleAIngresar]
        console.log(nuevoDetalleFactura)
        setDetalleFactura(nuevoDetalleFactura)
        console.log(detalleFactura)
    }
    console.log(platillos)
    const listenerPlatillos = createListener('get-platillos', (event, respuesta) => {
        setPlatillo(respuesta)
    })
 
    useListener(listenerPlatillos, platillos)
    useEffect(() => { listenerPlatillos.send()},[])
    return ( 
        <div> 
            <form> 
                <label> 
                    Cliente
                    <input type='text'></input>
                </label>
                <div>
                    <label>
                        Platillo
                            <select name='indexPlatillo' onChange={handleChange}>
                                <option value={'something'}>Escoja una de los platillos</option>
                                {platillos.map((platillo, index) => (
                                    <option value={index}>{platillo.nombre}</option>
                                ))}
                            </select>
                        <input name='cantidad' type='number' value={formData.cantidad} onChange={handleChange}></input>
                    </label>
                    <div onClick= {addPlatillo}>Agregar </div>
                </div>
            </form>
            <div>
                Detalle Factura
                <div>
                    {detalleFactura[0] ?Object.keys(detalleFactura[0]).map((key) => <div>{key}</div>) : null}
                </div>
                {detalleFactura.map((detalle) => (
                    <div>
                        {Object.values(detalle).map(val => (<div>{val} </div>))}
                    </div>
                ))}
                <div>Total : {detalleFactura.reduce((acc, cur) => { 

                    return acc + (curr.cantidadAPagar)
                },0)}</div>
            </div>
        </div>
    )
    

}

export default FacturaInsertar