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
        IdDetalleFactura: 1,
        IdFactura: 0,
        cantidad: 0,
        idPlatillo: 0,
        platillo: "Algo ahi",
        precio: 0,
        subtotal: 0,
        valorDescontado: 0
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
   


        console.log(newData)
        setDetalleFactura(newDetaleFactura)

    }


    //Listeners
    const listenerUnidades = createListener('get-unidad', (event, respuesta) => {
        setPlatillo(respuesta)
    })
    const listenerIngredientes = createListener('get-inventario', (event, respuesta) => {
        setPlatillo(respuesta)
    })
    const listenerFacturaDetalle = createListener('get-platillo-detalle', (event, respuesta) => {
        const { ingredientes, ...platillo } = respuesta
        setFactura(platillo)
        setDetalleFactura(ingredientes)

    })
    const listenerUpdateFactura = createListener('update-factura-detalle', (event, respuesta) => {
        console.log(respuesta)
    })

    const setUpdate = () => {
        const requestData = {
            ...platilloData,
            detalleFactura
        }
        console.log(requestData)
      //  listenerUpdateFactura.send(requestData)
    }
    //Efeccts
    useListener(listenerUnidades)
    useListener(listenerIngredientes)
    useEffect(() => {
        listenerUnidades.send()
        listenerIngredientes.send()
    }, [])
    useEffect(() => { listenerFacturaDetalle.send(id) }, [])

    useEffect(() => {
        const total = detalleFactura.reduce((acc, cur) => acc + cur.subtotal, 0)
        const totalDescuento = detalleFactura.reduce((acc, cur) => acc + cur.valorDescontado, 0)
        const nuevaFactura = { ...platilloData }
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
                            Nombre: <input className="insertinput" name='nombre' type='text' value={platilloData.nombre} onChange={updateFactura}></input>
                        </label>
                        <label className="insertlabel">
                            Precio: <input name='precio' type='number' className="checkl" value={platilloData.precio} onChange={updateFactura} ></input>
                        </label>
                        <label className="insertlabel">
                            Descuento %: <input name='porcentajeDescuento' type='number' className="checkl" value={platilloData.porcentajeDescuento} onChange={updateFactura} ></input>
                        </label>
                    </div>
                    <br></br>
                    <div>
                        <h2 className="updateDetalle">Detalle Factura</h2>
                        {
                            ingredientePlatillo.map((ingrediente, index) => {
                                console.log('Detalle ', detalle)
                                return (

                                    <div >

                                        <div className="updates">
                                            <label className="insertlabel">Ingrediente:
                                            <select className="platillito" name='idPlatillo' value={ingrediente.idPlatillo} onChange={updateDetalleFactura(index)} >
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
                        <td><span className="totalito"> {platilloData.precioTotal} </span></td>

                    </tr>
                    <tr className="totalfa">

                        <th><span className="totalfact">Descuento</span> </th>
                        <td><span className="totalito">{platilloData.totalDescuento}</span></td>
                    </tr>
                </table>

            </div>
            <div className="ingresarf" onClick={setUpdate}>
                Guardar
            </div>

        </>)
}

export default withNavbar(addStore(FacturaUpdate))