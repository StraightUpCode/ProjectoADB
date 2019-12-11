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
        if (e.target.name == 'cantidad') {
            newData.cantidad = parseFloat(newData.cantidad)
        }  
        console.log(newData)
        setInventario(newData)
    } 
   
     

    //Listeners
    const listenerUnidad = createListener('get-unidad', (event, respuesta) => {
        if (respuesta.ok) {
            setUnidad(respuesta.response)
      }
    })
    const listenerInventario = createListener('get-inventario-id', (event, respuesta) => {
        console.log(respuesta)
        if (respuesta.ok) {
            setInventario(respuesta.response)

        }
    })
    const listenerUpdateInventario = createListener('update-inventario', (event, respuesta) => { 
        if (respuesta.ok) {
            //hacer algo
        }
    })

    const setUpdate = () => {
        console.log(InventarioData)
        listenerUpdateInventario.send(InventarioData)
    } 
    //Efeccts
    useListener(listenerUnidad)
    useListener(listenerInventario)
    useListener(listenerUpdateInventario)
    useEffect(() => { listenerInventario.send(id) }, [])
    useEffect(() => { listenerUnidad.send() }, [])

    return (
        <>
       
       <div className="backi">
            <BackButton></BackButton></div>
            <div className="update"> 
            
                
                <form>
                    <h1 className="platupdi">Actualizar Inventario</h1>
                    <div className="insertarup">
                <p className="insertlabel">Inventario: {id} </p>
                
                    <label className="insertlabel">
                            Ingrediente: <input className="insertinput" name='ingrediente' type='text' value={InventarioData.ingrediente} onChange={updateInventario}></input>
                    </label>
                    <br></br>
                    <label className="insertlabel">
                            Cantidad: <input name='cantidad' type='number' value={InventarioData.cantidad}className="numbercito" onChange={updateInventario} ></input>
                        </label>
                        <label className="insertlabel">
                            Unidad: <select name='IdUnidad' value={InventarioData.IdUnidad} onChange={updateInventario} >
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