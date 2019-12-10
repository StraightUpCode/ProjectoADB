import React, { useState , useEffect} from 'react'
import{useParams } from 'react-router-dom'
import useListener from './hooks/useListener'
import useForm from './hooks/useForm'
import {createListener} from '../utils/events'
import { withNavbar } from './Navbar'

const FacturaUpdate = (props) => {
    const {id} = useParams()
    console.log('Factura Update')
    const [facturaData, setFactura] = useState({
        nombreCliente: '',
        cancelado: false,
        precioTotal: 0,
        totalDescontado: 0
    })
    const [detalleFactura, setDetalleFactura] = useState([{
            IdDetalleFactura: 1,
            IdFactura: 0,
            cantidad: 0,
            idPlatillo: 0,
            platillo: "Algo ahi",
            precio: 0,
            subtotal: 0,
            valorDescontado: 0
    }])

    const [platillos, setPlatillo] = useState([])
    //Funciones
    const updateFactura = (e) => { // actualiza la factura como tal
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const newData = {
            ...facturaData,
            [e.target.name]: value
        }

        console.log(newData)

        setFactura(newData)
    } 
    const updateDetalleFactura = (index) => (e) => {
        const newDetaleFactura = [...detalleFactura]
        const detalleAModificar = detalleFactura[index]
        const preValue = parseInt(e.target.value)
        const value = isNaN(preValue)? 0 : preValue;
        
        const newData = {
            ...detalleAModificar,
            [e.target.name] : value
        }
        console.log(e.target.name)
        console.log(detalleAModificar)
        console.log(value)
        const idPlatillo = e.target.name == 'idPlatilo' ? value : detalleAModificar.idPlatillo
        const platilloSeleccionado = platillos.find((element) => {
            return element.IdPlatillo == idPlatillo
        })
        newData.precio = platilloSeleccionado.precio
        newData.subtotal = newData.cantidad * newData.precio
        newData.valorDescontado = newData.subtotal * platilloSeleccionado.porcentajeDescuento
        newDetaleFactura[index] = newData
        
        console.log(platilloSeleccionado)
        console.log(newData)
    
       
        console.log(newData)
        setDetalleFactura(newDetaleFactura)
        
    }
     

    //Listeners
    const listenerPlatillos = createListener('get-platillos', (event, respuesta) => {
        setPlatillo(respuesta)
    })
    const listenerFacturaDetalle = createListener('get-factura-detalle', (event, respuesta) => {
        const { detalleFactura, ...factura } = respuesta
        setFactura(factura)
        setDetalleFactura(detalleFactura)

    })
    const listenerUpdateFactura = createListener('update-factura-detalle', (event, respuesta) => { 
        console.log(respuesta)
    })

    const setUpdate = () => {
        const requestData = {
            ...facturaData,
            detalleFactura
        }
        console.log(requestData)
        listenerUpdateFactura.send(requestData)
    } 
    //Efeccts
    useListener(listenerPlatillos)
    useListener(listenerFacturaDetalle)
    useEffect(() => { listenerPlatillos.send() }, [])
    useEffect(() => { listenerFacturaDetalle.send(id) }, [])

    useEffect(() => {
        const total = detalleFactura.reduce((acc, cur) => acc + cur.subtotal, 0)
        const totalDescuento = detalleFactura.reduce((acc, cur) => acc + cur.valorDescontado, 0)
        const nuevaFactura = { ...facturaData }
        nuevaFactura.precioTotal = total
        nuevaFactura.totalDescontado = totalDescuento
        setFactura(nuevaFactura)
    }, [detalleFactura]) 
 
    return (
        <>
            <div className="update"> 
                <p>Factura : {id}</p>
                <form>
                    <label>
                        Cliente: <input name='nombreCliente' type='text' value={facturaData.nombreCliente} onChange={updateFactura}></input>
                    </label>
                    <label>
                        Cancelado: <input name='cancelado' type='checkbox' checked={facturaData.cancelado} onChange={updateFactura} ></input>
                    </label>
                    <br></br>
                        <div>
                            Detalle Factura
                            {
                            detalleFactura.map((detalle, index) => {
                                console.log('Detalle ',detalle)
                                return (
                                    <div>
                                        <label>
                                            Platillo:
                                            <select name='idPlatillo' value={detalle.idPlatillo} onChange={updateDetalleFactura(index)} >
                                                {platillos.map((platillo) => {
                                                    return (<option value={platillo.IdPlatillo}>{platillo.nombre}</option>)
                                                }

                                                )}
                                            </select>
                                       </label>
                                        <input name='cantidad' type='number' value={detalle.cantidad} onChange={updateDetalleFactura(index)}></input>
                                        <div>{detalle.subtotal}</div>
                                        <div>{detalle.valorDescontado}</div>

                                    </div>
                                )
                            })
                            }

                    </div>
                    <div>
                        Total: {facturaData.precioTotal}
                        Descuento: {facturaData.totalDescontado}
                    </div>
                </form>
            </div>
            <div onClick={setUpdate}>
                Guardar
            </div>
        </>)
}

export default FacturaUpdate