import React, { useState, useEffect } from 'react'
import useListener from './hooks/useListener'
import { createListener } from '../utils/events'
import useForm from './hooks/useForm'
import { addStore } from '../utils/store'
import { withNavbar } from './Navbar'
import { useHistory } from 'react-router-dom'




const BackButton = (props) => {
    const history = useHistory()
    return (
        <a onClick={history.goBack} href="#" className="back" title="Regresar">
            <i class="fas fa-arrow-circle-left"></i>
        </a>
    )
}

const PlatilloInsert = ({ store }) => {
    const [platilloData, handlePlatillo, resetPlatillo] = useForm({
        nombre: '',
        precio: 0,
        porcentajeDescuento: 0,
    })
    const [Ingredientes, setIngredientes] = useState([])
    const [Unidades, setUnidades] = useState([])
    const [PlatilloIngrediente, setPlatilloIngrediente] = useState([])
    const [formData, handleChange, resetForm] = useForm({
        indexInventario: 0,
        indexUnidad: 0,
        cantidad: 0,
    })

    const listenerUnidades = createListener('get-unidad', (event, respuesta) => {
        if (respuesta.ok) {
            setUnidades(respuesta.response)
      }
    })
    const listenerInventario = createListener('get-inventario', (event, respuesta) => {
        console.log(respuesta)
        if (respuesta.ok) {
            setIngredientes(respuesta.response)

        }
    })
    const createPlatillo = createListener('create-platillo', (event, respuesta) => {
        if (respuesta.ok) {
            resetPlatillo()
            resetForm()
            setPlatilloIngrediente([])
        }
        
    })
    const sendPlatillo = () => {
        platilloData.precio = parseInt(platilloData.precio)
        platilloData.porcentajeDescuento = parseInt(platilloData.porcentajeDescuento)
        const request = {
            ...platilloData,
            ingredientes: PlatilloIngrediente
        }
        createPlatillo.send(request)
    }
    const addPlatillo = () => {
        console.log('Form data', formData)
        const ingrediente = Ingredientes[parseInt(formData.indexInventario)]
        const unidad = Unidades[parseInt(formData.indexUnidad)]
        const cantidad = parseInt(formData.cantidad)
        const nuevoIngrediente = {
            idInventario: ingrediente.IdInventario,
            ingrediente: ingrediente.ingrediente,
            ...unidad,
            cantidad
        }
        setPlatilloIngrediente([...PlatilloIngrediente, nuevoIngrediente])
    
    }
    useListener(createPlatillo)
    useListener(listenerInventario, Ingredientes)
    useListener(listenerUnidades, Unidades)
    useEffect(() => {
        listenerUnidades.send()
        listenerInventario.send()
    }, [])

    return (
        <>
            <div className="backi">
                <BackButton></BackButton>
            </div>

            <div>
            <h1 className="invih1">Nuevo Platillo</h1>
                <form className="insertar">
                    <div >
                        <label className="insertlabel">
                            Nombre del Platillo</label>
                        <input className="insertinput" name='nombre' value={platilloData.nombre} onChange={handlePlatillo} type='text'></input>
                        <br></br>
                        <label className="insertlabel">
                            Precio </label>
                        <input className="insertinput" name='precio' checked={platilloData.precio} onChange={handlePlatillo} type='number'></input>
                        <br></br>
                        <label className="insertlabel">
                            Descuento </label>
                        <input className="insertinput" name='porcentajeDescuento' checked={platilloData.porcentajeDescuento} onChange={handlePlatillo} type='number'></input>

                    </div>
                    <div>
                        <label className="insertlabel">
                            Ingredientes
                            <select className="insertinput" name='indexInventario' onChange={handleChange}>
                                <option value={'something'}>Escoja una de los ingredientes</option>
                                {Ingredientes.map((ingrediente, index) => (
                                    <option value={index}>{ingrediente.ingrediente}</option>
                                ))}
                            </select>
                            <input className="numero" name='cantidad' type='number' value={formData.cantidad} onChange={handleChange}></input>
                            <select className="insertinput" name='indexUnidad' onChange={handleChange}>
                                {Unidades.map((unidad, index) => (
                                    <option value={index}>{unidad.unidad}</option>
                                ))}
                            </select>
                        </label>
                        <div className="agregar" onClick={addPlatillo}>Agregar </div>
                    </div>
                </form>

                <table className="tablefactura">


                    {/* Header de la tabla ?  */}
                    <thead>
                        <tr  >
                            <th >
                            Ingrediente
                            </th>
                            <th >
                                Cantidad
                            </th>
                            <th >
                                Unidad
                            </th>
                        </tr>
                    </thead>
                    {/** Valores de los detalles Factura */}
                    <tbody>
                        {PlatilloIngrediente.map((ingrediente) => (
                            <tr>
                                <td>{ingrediente.ingrediente}</td> 
                                <td>{ingrediente.cantidad}</td> 
                                <td>{ingrediente.unidad}</td> 
                            </tr>
                        ))}
                    </tbody>


                </table>

                <div className="ingresarf" onClick={sendPlatillo}>Ingresar</div>
            </div>

        </>


    )


}

export default withNavbar(addStore(PlatilloInsert))
