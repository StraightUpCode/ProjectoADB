import React,{useState, useEffect} from 'react'
import  useForm  from './hooks/useForm'
import { createListener } from '../utils/events'
import useListener  from './hooks/useListener'
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


const InventarioInsert = () => {
    const [inventarioData, handleChange, resetForm] = useForm({
        ingrediente: '',
        idUnidad: 'default',
        cantidad: 0
    })
    const [unidades, setUnidad] = useState([{ idUnidad: 0 , unidad: '', }])
    
    const listenerUnidad = createListener('get-unidad', (evento, respuesta) => {
        if (respuesta.ok) {
            setUnidad(respuesta.response)
        }
    })
    const listenerInventario = createListener('create-inventario', (evento, respuesta) => {
        console.log(respuesta)
        if (respuesta.ok) {
            resetForm()
        }
    })
    useListener(listenerInventario)
    useListener(listenerUnidad)
    useEffect(() => {
        listenerUnidad.send()
    }, [])
    const sendInvetario = () => {
        inventarioData.idUnidad = parseInt(inventarioData.idUnidad)
        inventarioData.cantidad = parseInt(inventarioData.cantidad)
        console.log(inventarioData)
        listenerInventario.send(inventarioData)
    }
    return ( 
        <>
        <div className="backi">
        <BackButton></BackButton></div>
        <div>
            <h1 className="invih1"> Nuevo Item de Inventario</h1>
            <form className="insertarinvi"> 
                <label className="insertinvl">Ingrediente: </label>
                    <input className="insertinput"name='ingrediente' type='text' value={inventarioData.ingrediente} onChange={handleChange} />
                <br></br>
                <label className="insertinvl">Unidad: 
                    <select className="selectito" name='idUnidad' onChange={handleChange}>
                        <option value={'something'}>Escoja una de las unidades</option>
                        {unidades.map((unidad) => (<option value={unidad.IdUnidad}>{unidad.unidad}</option>))}
                    </select>
                    </label>
                    <br></br>
                <label className="insertinvl">Cantidad:
                    <input className="numerooto" name='cantidad' type='number' value={inventarioData.cantidad} onChange={handleChange} />
                    </label>
                    <div className="agregar" onClick={sendInvetario}> Enviar </div>
            </form>
           
        </div>
        </>
    )
}

export default withNavbar(addStore(InventarioInsert))