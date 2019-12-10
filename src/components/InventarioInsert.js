import React,{useState, useEffect} from 'react'
import  useForm  from './hooks/useForm'
import { createListener } from '../utils/events'
import useListener  from './hooks/useListener'


const InventarioInsert = () => {
    const [inventarioData, handleChange, resetForm] = useForm({
        ingrediente: '',
        idUnidad: 'default',
        cantidad: 0
    })
    const [unidades, setUnidad] = useState([{ idUnidad: 0 , unidad: '', }])
    
    const listenerUnidad = createListener('get-unidad', (evento, respuesta) => {
        setUnidad(respuesta)
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
        <div>
            <div> Nuevo Item de Inventario</div>
            <form> 
                <label>Ingrediente :
                    <input name='ingrediente' type='text' value={inventarioData.ingrediente} onChange={handleChange} />
                </label>
                <label>Unidad :
                    <select name='idUnidad' onChange={handleChange}>
                        <option value={'something'}>Escoja una de las unidades</option>
                        {unidades.map((unidad) => (<option value={unidad.IdUnidad}>{unidad.unidad}</option>))}
                    </select>
                </label>
                <label>Cantidad :
                    <input name='cantidad' type='number' value={inventarioData.cantidad} onChange={handleChange} />
                </label>

            </form>
            <div onClick={sendInvetario}> Enviar </div>
        </div>
    )
}

export default InventarioInsert