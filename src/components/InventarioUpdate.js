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
        IdInventario: 0,
        ingrediente: '',
        cantidad: 0,
        IdUnidad: 0
    })


    const [unidades, setUnidad] = useState([])
    //Funciones
    const updateInventario = (e) => { // actualiza la factura como tal
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const newData = {
            ...InventarioData,
            [e.target.name]: value
        }
        console.log(newData)

        setInventario(newData)
    } 
   
     

    //Listeners
    const listenerUnidad = createListener('get-unidad', (event, respuesta) => {
        setUnidad(respuesta)
    })
    const listenerInventarioDetalle = createListener('get-inventario', (event, respuesta) => {
        setInventario(factura)

    })
    const listenerUpdateInventario = createListener('update-inventario', (event, respuesta) => { 
        console.log(respuesta)
    })

    const setUpdate = () => {
        const requestData = {
            ...facturaData
        }
        console.log(requestData)
        listenerUpdateInventario.send(requestData)
    } 
    //Efeccts
    useListener(listenerUnidad)
    useListener(listenerInventario)
    useEffect(() => { listenerInventario.send() }, [])
    useEffect(() => { listenerInventarioDetalle.send(id) }, [])

    return (
        <>
       
       <div className="backi">
            <BackButton></BackButton></div>
            <div className="update"> 
            
                
                <form>
                    <div className="insertarup">
                <p className="insertlabel">Inventario: {id} </p>
                
                    <label className="insertlabel">
                            Ingrediente: <input className="insertinput" name='nombreCliente' type='text' value={InventarioData.ingrediente} onChange={updateInventario}></input>
                    </label>
                    <label className="insertlabel">
                            Cantidad: <input name='cancelado' type='number' className="checkl" onChange={updateInventario} ></input>
                        </label>
                        <label className="insertlabel">
                            Unidad: <select value={InventarioData.IdUnidad} onChange={updateInventario} >
                                {unidades.map(unidad => (<option value={unidad.IdUnidad}>{unidad.unidad}</option>))}
                            </select>
                        </label>
                    </div>
                   
                </form>
            

            </div>
            <div className="ingresarf" onClick={setUpdate}>
                Guardar
            </div>
        
        </>)
}

export default withNavbar(addStore(InventarioUpdate))