import React, { useState, useEffect } from 'react'
import useListener from './hooks/useListener'
import { createListener } from '../utils/events'
import useForm from './hooks/useForm'
import { addStore } from '../utils/store'
import { withNavbar } from './Navbar'


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
        const detalleAIngresar = {
            ...platillo,
            cantidad: cantidadPlatillo,
            subTotal : cantidadPlatillo * platillo.precio,
            valorDescontado: platillo.precio * cantidadPlatillo * (platillo.porcentajeDescuento / 100)
        }
        const nuevoDetalleFactura = [...detalleFactura, detalleAIngresar]
        setDetalleFactura(nuevoDetalleFactura)
        resetForm()
    }
    const listenerPlatillos = createListener('get-platillos', (event, respuesta) => {
        setPlatillo(respuesta)
    })
    const createFactura = createListener('create-factura', (event, respuesta) => { 
        if (respuesta.ok) {
            resetFactura()
            resetForm()
            setDetalleFactura([])
        }
        
    })
    const sendFactura = () => {
        console.log(store)
        const IdUsuario = store.user.IdUsuario
        const data = { IdUsuario, ...facturaData, detalleFactura }
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
        <>
        <div> 
            <form className="insertar"> 
            <div >
                <label className="insertlabel"> 
                    Cliente</label>
                    <input className="insertinput" name='nombreCliente' value={facturaData.nombreCliente} onChange={handleFactura} type='text'></input>
                
                <label className="insertlabel">
                    Cancelado </label>
                    <input className="checkl" name='cancelado' checked={facturaData.cancelado} onChange={handleFactura} type='checkbox'></input>
               
                </div>
                <div>
                    <label className="insertlabel">
                        Platillo
                            <select  className="insertinput" name='indexPlatillo' onChange={handleChange}>
                                <option value={'something'}>Escoja una de los platillos</option>
                                {platillos.map((platillo, index) => (
                                    <option value={index}>{platillo.nombre}</option>
                                ))}
                            </select>
                        <input className="numero"  name='cantidad' type='number' value={formData.cantidad} onChange={handleChange}></input>
                    </label>
                    <div className="agregar" onClick= {addPlatillo}>Agregar </div>
                </div>
            </form>
            <div>
                
                <div className="morir">
                    <h2 className="morirh2">Detalle Factura</h2>
                    {detalleFactura[0] ?Object.keys(detalleFactura[0]).map((key) => <div>{key}</div>) : null}
                
                {detalleFactura.map((detalle) => (
                    <div>
                        {Object.values(detalle).map(val => (<div>{val} </div>))}
                    </div>
                ))}

                
                <p>Total: <label>{facturaData.precioTotal}</label></p>

                <div className="ingresarf" onClick={sendFactura}>Ingresar</div>
                </div>
            </div>
            
        </div>
        </>
    )
    

}

export default withNavbar(addStore(FacturaInsertar))