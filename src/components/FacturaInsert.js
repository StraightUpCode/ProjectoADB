import React, { useState } from 'react'
import useListener from './hooks/useListener'
import { createListener } from '../utils/events'
import useForm from './hooks/useForm'

const FacturaInsertar = (props) => { 
    const [nombreCliente, setNombreCliente] = useState('')
    const [detalleFactura, setDetalleFactura] = useState([])
    const [platillo, handleChange] = useForm({
        IdPlatillo: 0,
        cantidad: 0
    })
    const addPlatillo = () => { 
        const nuevoDetalleFactura = [...detalleFactura, platillo]
        setDetalleFactura(nuevoDetalleFactura)
    }
    const [platilloSearch, setPlatillo] = useState([])
    const listenerBusqueda = createListener('buscar-platillos', (event, respuesta) => {
        setPlatillo(respuesta)
    })
    useListener(listenerBusqueda, platilloSearch)
    handleBusqueda = (event) => { 
        const valorBusqueda = event.target.value
        if (platilloSearch.length !== 0) {
            listenerBusqueda.send(valorBusqueda)
        }
        else {
            setPlatillo(platilloSearch.filter((value) => value.nombre == valorBusqueda ))
        }
    }

    return ( 
        <div> 
            <form> 
                <label> 
                    Cliente
                    <input type='text'></input>
                </label>
                <div>
                    <label>
                        Platillo
                        <input type='text' value={nombreCliente} onChange={setNombreCliente}></input>
                        {platilloSearch.length > 0 ? (
                            <select name='IdPlatillo' onSelect={handleChange}>
                                {platilloSearch.map(platillo => (
                                    <option value={platillo.IdPlatillo}>{platillo.nombre}</option>
                                ))}
                            </select>
                        ) : null}
                        <input type='number'></input>
                    </label>
                    <div onClick= {addPlatillo}>Agregar </div>
                </div>
            </form>
        </div>
    )
    

}