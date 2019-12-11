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


const InventarioUpdate = (props) => {
    const {id} = useParams()
    console.log('Inventario update')
    const [InventarioData, setInventario] = useState({
        ingrediente: '',
        cantidad: ''
    })


    const [unidad, setUnidad] = useState([])
    //Funciones
    const updateInventario = (e) => { // actualiza la factura como tal
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const newData = {
            ...InventarioData,
            [e.target.name]: value
        }

        console.log(newData)

        setFactura(newData)
    } 
    const updateInventarioUnidad= (index) => (e) => {
        const newInventarioUpdate = [...detalleInventario]
        const detalleAModificar = detalleInventario[index]
        const preValue = parseInt(e.target.value)
        const value = isNaN(preValue)? 0 : preValue;
        
        const newData = {
            ...detalleAModificar,
            [e.target.name] : value
        }
        console.log(e.target.name)
        console.log(detalleAModificar)
        console.log(value)
        const idUnidad = e.target.name == 'idUnidad' ? value : detalleAModificar.idUnidad
        const unidadSeleccionada = unidad.find((element) => {
            return element.IdUnidad == idUnidad
        })

        
        
        console.log(newData)
    
       
        console.log(newData)
        setDetalleFactura(NewdetalleInventario)
        
    }
     

    //Listeners
    const listenerUnidad = createListener('get-unidad', (event, respuesta) => {
        setUnidad(respuesta)
    })
    const listenerInventarioDetalle = createListener('get-inventario-detalle', (event, respuesta) => {
        conInventario(factura)
        setDetalleInventario(detalleInventario)

    })
    const listenerUpdateInventario = createListener('update-Inventario-detalle', (event, respuesta) => { 
        console.log(respuesta)
    })

    const setUpdate = () => {
        const requestData = {
            ...facturaData,
            detalleUnidad
        }
        console.log(requestData)
        listenerUpdateInventario.send(requestData)
    } 
    //Efeccts
    useListener(listenerUnidad)
    useListener(listenerInventario)
    useEffect(() => { listenerInventario.send() }, [])
    useEffect(() => { listenerInventarioDetalle.send(id) }, [])
/*
    useEffect(() => {
        const total = detalleFactura.reduce((acc, cur) => acc + cur.subtotal, 0)
        const totalDescuento = detalleFactura.reduce((acc, cur) => acc + cur.valorDescontado, 0)
        const nuevaFactura = { ...facturaData }
        nuevaFactura.precioTotal = total
        nuevaFactura.totalDescontado = totalDescuento
        setFactura(nuevaFactura)
    }, [detalleFactura]) 
 */
    return (
        <>
       
       <div className="backi">
            <BackButton></BackButton></div>
            <div className="update"> 
            
                
                <form>
                    <div className="insertarup">
                <p className="insertlabel">Inventario: {id} </p>
                
                    <label className="insertlabel">
                        Cliente: <input className="insertinput" name='nombreCliente' type='text' value={facturaData.ingrediente} onChange={updateInventario}></input>
                    </label>
                    <label className="insertlabel">
                        Cancelado: <input name='cancelado' type='checkbox' className="checkl" checked={facturaData.cantidad} onChange={updateInventario} ></input>
                    </label></div>
                    <br></br>
                        <div>
                        <h2 className="updateDetalle">Detalle Inventario</h2>
                            {
                            detalleInventario.map((detalle, index) => {
                                console.log('Detalle ',detalle)
                                return (
                                    
                                    <div >
                                
                                        <div className="updates">
                                            <label className="insertlabel">Unidad:
                                            <select className="platillito" name='idPlatillo' value={detalle.idUnidad} onChange={updateDetalleInventario(index)} >
                                                {unidad.map((unidad) => {
                                                    return (<option value={unidad.idUnidad}>{unidad.unidad}</option>)
                                                }

                                                )}
                                            </select>
                                       
                                        </label>
                                        <br></br>

                                        <br></br>

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