import React, { useEffect, useState } from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import {withNavbar} from'./Navbar'
import {useHistory} from 'react-router-dom'



const BackButton = (props) => { 
    const history = useHistory()
    return (
      <a onClick={history.goBack} href="#" className="back" title="Regresar">
        <i class="fas fa-arrow-circle-left"></i>
      </a>
    )
  }


const InventarioHistorico = (props) => {
    const [inventarioHistorico, setInventarioHistorico] = useState([{
        IdInventarioHistorico: 0,
        fechaRegistrado: '',
        cantidad: 0,
        ingrediente: '',
        unidad: '',
    }])

    const listenerInventarioHistorico = createListener('get-inventario-historico', (evento, respuesto) => {
        if (respuesto.ok) {
            setInventarioHistorico(respuesta.response)
        }
    })
    useListener(listenerInventarioHistorico)
    useEffect(() => {
        listenerInventarioHistorico.send()
    })
    return (
        <>
        <div className="backi"><BackButton></BackButton></div>
        <div> 
            <h1 className="invh1">Inventario Historico</h1>
            <table className='table'> 
                <thead>
                    <th>
                        Fecha
                    </th>
                    <th>
                        Ingrediente
                    </th>
                    <th>
                        Cantidad
                    </th>
                    <th>
                        Unidad
                    </th>
                </thead>
                <tbody>
                    {inventarioHistorico.map(registro => 
                        (<tr>
                            <td>
                                {registro.fechaRegistrado}
                            </td>
                            <td>
                                {registro.ingrediente}
                            </td>
                            <td>
                                {registro.cantidad}
                            </td>
                            <td>
                                {registro.unidad}
                            </td>
                        </tr>)
                    )}
                </tbody>
            </table>
        </div>
        </>
    )
   
}

export default withNavbar(InventarioHistorico)