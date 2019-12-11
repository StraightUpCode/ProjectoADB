import React, { useEffect } from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import {withNavbar} from'./Navbar'
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
        <div> 
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
    )
}

export default withNavbar(InventarioHistorico)