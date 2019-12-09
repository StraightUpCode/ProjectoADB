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
    const [detalleFactura, setDetalleFactura] = useState([])

    const [platillos, setPlatillo] = useState([])
    const [opcionesPlatillo, setOpcionesPlatillo] = useState([])
    //Funciones
    const updateFactura = (event) => { // actualiza la factura como tal
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const newData = {
            ...facturaData,
            [e.target.name]: value
        }
        setFactura(newData)
    } 
    const updateDetalleFactura = (index) => (event) => {
        const newDetaleFactura = [...detalleFactura]
        const detalleAModificar = newDetaleFactura[index]
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
       
        //setDetalleFactura(newDetaleFactura)
        
    }
    const setUpdate = () => {
        console.log({
            ...facturaData,
            detalleFactura
        })
    }

    //Listeners
    const listenerPlatillos = createListener('get-platillos', (event, respuesta) => {
        setPlatillo(respuesta)
    })
    const listenerFacturaDetalle = createListener('get-factura-detalle', (event, respuesta) => {
        const { detalleFactura, ...factura } = respuesta
        setDetalleFactura(detalleFactura)
        setFactura(factura)
    })
    //Efeccts

    useEffect(() => { listenerPlatillos.send() }, [])
    useEffect(() => { listenerFacturaDetalle.send(id) }, [])

    useEffect(() => {
        const total = detalleFactura.reduce((acc, cur) => acc + cur.subTotal, 0)
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
                        Cliente: <input type='text' value={facturaData.nombreCliente}></input>
                    </label>
                    <label>
                        Cancelado: <input type='checkbox' checked={facturaData.cancelado}></input>
                    </label>
                    <br></br>
                        <div>
                            Detalle Factura
                            {
                            detalleFactura.map((detalle, index) => {
                                
                                return (
                                    <div>
                                        <select onChange={updateDetalleFactura(index)} value={detalleFactura.IdPlatillo}>
                                            {platillos.map((platillo) => 
                                                (<opciones value={platillo.IdPlatillo}>{platillo.nombre}</opciones>)
                                            )}
                                        </select>
                                        <input type='number' value={detalle.cantidad}></input>
                                        <div>{detalle.subTotal}</div>
                                        <div>{detalle.valorDescontado}</div>

                                    </div>
                                )
                            })
                            }

                    </div>
                </form>
            </div>
        </>)
}

export default withNavbar(FacturaUpdate)