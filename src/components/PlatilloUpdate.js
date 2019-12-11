import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useListener from './hooks/useListener'
import useForm from './hooks/useForm'
import { createListener } from '../utils/events'
import { withNavbar } from './Navbar'
import { useHistory } from 'react-router-dom'
import { addStore } from '../utils/store'



const BackButton = (props) => {
    const history = useHistory()
    return (
        <a onClick={history.goBack} href="#" className="back" title="Regresar">
            <i class="fas fa-arrow-circle-left"></i>
        </a>
    )
}


const PlatilloUpdate = (props) => {
    const { id } = useParams()
    console.log('Factura Update')
    const [platilloData, setPlatillo] = useState({
        IdPlatillo: 1,
        nombre: '',
        precio: 0,
        porcentajeDescuento: 0
    })

    const [ingredientePlatillo, setIngredientePlatillo] = useState([{
        IdPlatilloIngrediente: 0,
        IdInventario: 0,
        IdUnidad: 0,
        ingrediente: '',
        cantidad: 0,
        unidad: 'gr',
        idPlatillo: 0,
    }])

    const [unidades, setUnidades] = useState([])
    const [ingredientes, setIngredientes] = useState([])

    //Funciones
    const updatePlatillo = (e) => { // actualiza la factura como tal
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const newData = {
            ...platilloData,
            [e.target.name]: value
        }

        console.log(newData)

        setPlatillo(newData)
    }
    const updatePlatilloIngrediente = (index) => (e) => {
        
        const preValue = parseInt(e.target.value)
        const value = isNaN(preValue) ? 0 : preValue;
        const nuevoIngredientePlatillo = [...ingredientePlatillo]
        console.log('Registro en Ingredientes Platillo', ingredientePlatillo[index])
        const newData = {
            ...ingredientePlatillo[index],
            [e.target.name] : value
        }
        console.log('Nuew Daata', {[e.target.name ]: value})
        console.log('Viejo Ingrediente Platillo', ingredientePlatillo[index])
        console.log('Nuevo Ingrediente Platillo', newData)
        nuevoIngredientePlatillo[index] = newData
        console.log(nuevoIngredientePlatillo[index])
        setIngredientePlatillo(nuevoIngredientePlatillo)

    }


    //Listeners
    const listenerUnidades = createListener('get-unidad', (event, respuesta) => {
        setUnidades(respuesta)
    })
    const listenerIngredientes = createListener('get-inventario', (event, respuesta) => {
        setIngredientes(respuesta)
    })
    const listenerPlatilloDetalle = createListener('get-platillo-detalle', (event, respuesta) => {
        const { ingredientes, ...platillo } = respuesta
        console.log('Recibir Ingredientes',ingredientes)
        console.log('Recibir Platillos',platillo)
        setPlatillo(platillo)
        setIngredientePlatillo(ingredientes)

    })
    const listenerUpdateFactura = createListener('update-platillo-detalle', (event, respuesta) => {
        if (respuesta.ok) {
            console.log('Que tuani')
        }  
    })


    const setUpdate = () => {
        const requestData = {
            ...platilloData,
            ingredientes: ingredientePlatillo
        }
        console.log(requestData)
      listenerUpdateFactura.send(requestData)
    }
    //Efeccts
    useListener(listenerUnidades)
    useListener(listenerIngredientes)
    useListener(listenerPlatilloDetalle)
    useListener(listenerUpdateFactura)
    useEffect(() => {
        listenerUnidades.send()
        listenerIngredientes.send()
    }, [])
    useEffect(() => { listenerPlatilloDetalle.send(id) }, [])


    return (
        <>

            <div className="backi">
                <BackButton></BackButton></div>
            <div className="update">


                <form >
                    <div className="platup">
                        <p className="insertlabel">Platillo:  {id} </p>

                        <label className="insertlabel">
                            Nombre <input className="insertinput" name='nombre' type='text' value={platilloData.nombre} onChange={updatePlatillo}></input>
                        </label>
                        <br></br>
                        <label className="insertlabel">
                            Precio <input name='precio' type='number' className="numbercito" value={platilloData.precio} onChange={updatePlatillo} ></input>
                        </label>
                        <br></br>
                        <label className="insertlabel">
                            Descuento % <input name='porcentajeDescuento' type='number' className="numbercito" value={platilloData.porcentajeDescuento} onChange={updatePlatillo} ></input>
                        </label>
                    </div>
                    <br></br>
                    <div>
                        <h2 className="updateDetalle">Ingredientes</h2>
                        {
                            ingredientePlatillo.map((ingrediente, index) => {
                                return (

                                    <div >

                                        <div className="updates">
                                            <label className="insertlabel">Ingrediente:
                                            <select className="platillito" name='IdInventario' value={ingrediente.IdInventario} onChange={updatePlatilloIngrediente(index)} >
                                                    {ingredientes.map((ingrediente2) => {
                                                        return (<option value={ingrediente2.IdInventario}>{ingrediente2.ingrediente}</option>)
                                                    }
                                                    )}
                                                </select>

                                            </label>
                                            <label>
                                                Cantidad
                                                <input className="numbercito" name='cantidad' type='number' value={ingrediente.cantidad} onChange={updatePlatilloIngrediente(index)}></input>
                                            </label>
                                            <label className="insertlabel">Unidades:
                                            <select className="platillito" name='IdUnidad' value={ingrediente.IdUnidad} onChange={updatePlatilloIngrediente(index)} >
                                                    {unidades.map((unidad) => {
                                                        return (<option value={unidad.IdUnidad}>{unidad.unidad}</option>)
                                                    }

                                                    )}
                                                </select>

                                            </label>
                                        </div>

                                    </div>
                                )
                            })
                        }


                    </div>


                </form>

            </div>
            <div className="ingresarf" onClick={setUpdate}>
                Guardar
            </div>

        </>)
}

export default withNavbar(addStore(PlatilloUpdate))