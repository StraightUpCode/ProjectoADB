import React, { useState, useEffect } from 'react'
import useListener from './hooks/useListener'
import { createListener } from '../utils/events'
import useForm from './hooks/useForm'
import { addStore } from '../utils/store'


const FacturaInsertar = ({store}) => { 
    const [facturaData, handleFactura, resetFactura] = useForm({
        nombreCliente: '',
        cancelado: false,
        precioTotal: 0,
        totalDescontado : 0
    })
    const [platillos, setPlatillo] = useState([])
    const [detalleFactura, setDetalleFactura] = useState([])
    const [formData, handleChange, resetForm] = useForm({
        indexPlatillo: 0,
        cantidad: 0
    })

    const addPlatillo = () => { 
        const cantidadPlatillo = parseInt(formData.cantidad)
        const platillo = platillos[parseInt(formData.indexPlatillo)]
        console.log(platillo)
        const detalleAIngresar = {
            ...platillo,
            cantidad: cantidadPlatillo,
            subTotal : cantidadPlatillo * platillo.precio,
            valorDescontado: platillo.precio * cantidadPlatillo * (platillo.porcentajeDescuento / 100)
        }
        const nuevoDetalleFactura = [...detalleFactura, detalleAIngresar]
        console.log(nuevoDetalleFactura)
        setDetalleFactura(nuevoDetalleFactura)
        resetForm()
        console.log(detalleFactura)
    }
    console.log(platillos)
    const listenerPlatillos = createListener('get-platillos', (event, respuesta) => {
        setPlatillo(respuesta)
    })
    const createFactura = createListener('create-factura', (event, respuesta) => { 
        console.log(respuesta)
        resetFactura()
        resetForm()
    })
    const sendFactura = () => {
        console.log(store)
        const IdUsuario = store.user.IdUsuario
        console.log(IdUsuario)
        const data = { IdUsuario, ...facturaData, detalleFactura }
        console.log(data)
        createFactura.send(data)
    }
    useListener(createFactura)
    useListener(listenerPlatillos, platillos)
    useEffect(() => { listenerPlatillos.send() }, [])
    useEffect(() => {
        const total = detalleFactura.reduce((acc, cur) => acc + cur.subTotal, 0)
        handleFactura({ target: { name: 'precioTotal', value: total } })        
    }, [detalleFactura])
    useEffect(() => {
        const totalDescuento = detalleFactura.reduce((acc, cur) => acc + cur.valorDescontado, 0)
        handleFactura({ target: { name: 'totalDescontado', value: totalDescuento } })
    },[formData.precioTotal])
    return ( 
        <div> 
            <form> 
                <label> 
                    Cliente
                    <input name='nombreCliente' value={facturaData.nombreCliente} onChange={handleFactura} type='text'></input>
                </label>
                <label>
                    Cancelado
                    <input name='cancelado' checked={facturaData.cancelado} onChange={handleFactura} type='checkbox'></input>
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
                <div>Total : {facturaData.precioTotal}</div>
            </div>
            <div onClick={sendFactura}>Ingresar</div>
        </div>
    )
    

}

export default addStore(FacturaInsertar)