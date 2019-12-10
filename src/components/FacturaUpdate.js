import React, { useState , useEffect} from 'react'
import{useParams } from 'react-router-dom'
import useListener from './hooks/useListener'
import useForm from './hooks/useForm'
import {createListener} from '../utils/events'
import { withNavbar } from './Navbar'
import {useHistory} from 'react-router-dom'
import { addStore } from '../utils/store'



const BackButton = (props) => { 
    const history = useHistory()
    return (
      <a onClick={history.goBack} href="#" className="back" title="Regresar">
        <i class="fas fa-arrow-circle-left"></i>
      </a>
    )
  }


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
       
       <div className="backi">
            <BackButton></BackButton></div>
            <div className="update"> 
            
                
                <form>
                    <div className="insertarup">
                <p className="insertlabel">Factura: {id} </p>
                
                    <label className="insertlabel">
                        Cliente: <input className="insertinput" name='nombreCliente' type='text' value={facturaData.nombreCliente} onChange={updateFactura}></input>
                    </label>
                    <label className="insertlabel">
                        Cancelado: <input name='cancelado' type='checkbox' className="checkl" checked={facturaData.cancelado} onChange={updateFactura} ></input>
                    </label></div>
                    <br></br>
                        <div>
                        <h2 className="updateDetalle">Detalle Factura</h2>
                            {
                            detalleFactura.map((detalle, index) => {
                                console.log('Detalle ',detalle)
                                return (
                                    
                                    <div >
                                
                                        <div className="updates">
                                            <label className="insertlabel">Platillo:
                                            <select className="platillito" name='idPlatillo' value={detalle.idPlatillo} onChange={updateDetalleFactura(index)} >
                                                {platillos.map((platillo) => {
                                                    return (<option value={platillo.IdPlatillo}>{platillo.nombre}</option>)
                                                }

                                                )}
                                            </select>
                                       
                                        <input className="numbercito" name='cantidad' type='number' value={detalle.cantidad} onChange={updateDetalleFactura(index)}></input>
                                        </label>
                                        <br></br>
                                        <label className="labeltit">SubTotal: {detalle.subtotal}</label>
                                        <br></br>
                                        <label className="labeltit">Valor Descontado: {detalle.valorDescontado}</label>
                                        </div>

                                    </div>
                                )
                            })
                            }

                          
                    </div>

                   
                </form>
                <table className="tablefacturaupdate">   
                        <tr className="totalfa">
                            <th><span className="totalfact">Total</span></th>
                            <td><span className="totalito"> {facturaData.precioTotal} </span></td>
                            
                        </tr>
                        <tr className="totalfa">

                       <th><span className="totalfact">Descuento</span> </th>
                       <td><span className="totalito">{facturaData.totalDescuento}</span></td>
                       </tr>
                       </table>  

            </div>
            <div className="ingresarf" onClick={setUpdate}>
                Guardar
            </div>
        
        </>)
}

export default withNavbar(addStore(FacturaUpdate))