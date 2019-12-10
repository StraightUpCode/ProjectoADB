import React, { useState, useEffect} from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { addStore } from '../utils/store'
import Zelda from '../utils/Zelda'
import Navbar, { withNavbar } from './Navbar'

import {useHistory} from 'react-router-dom'




const BackButton = (props) => { 
    const history = useHistory()
    return (
      <a onClick={history.goBack} href="#" className="back" title="Regresar">
        <i class="fas fa-arrow-circle-left"></i>
      </a>
    )
  }




const FacturaView = ({ store, addPermisos }) => { 
    console.log(store.user)
    const  permisoPermicial = {}
   // const permisoPermicial = store.user.permisos.find(el => el.tabla == 'Factura')
    //addPermisos([{tabla: 'Factura', crud: 15}])
    permisoPermicial.crud = 15
    const permisoFactura = permisoPermicial.crud.toString(2).padStart(4,'0')
    console.log(permisoFactura)
    const [facturas, setFacturas] = useState([
        {
            IdFactura: 1,
            vendedor: '',
            nombreCliente: '',
            precioTotal: '',
            totalDescontado: '',
            cancelado: 1,
            fecha: ''
        }
    ])
    const listener = createListener('get-facturas', (event, data) => {
        
        setFacturas(data)
        
        
    })
    useListener(listener,facturas)
    useEffect(() => {
       listener.send()
    }, [])
    console.log(permisoFactura)
    return (
      <>
      <div className="backi">
       <BackButton></BackButton></div>
        <div>
            <div><h1 className="facturah1">Factura</h1></div>

            <div>
           
                {
                    facturas.map((factura) => (
                        <div className="ver">
                            <div >
                               <p className="name">N Factura: <label className="verfactura"> {factura.IdFactura} </label></p>
                                <p className="name">Fecha: <label className="verfactura"> {factura.fecha}  </label></p>
                               <p className="name">Vendedor: <label className="verfactura"> {factura.vendedor}  </label></p>
                               <p className="name">Cliente: <label className="verfactura"> {factura.nombreCliente}  </label> </p>
                               <p className="name">Total: <label className="verfactura"> {factura.precioTotal}  </label></p>
                               <p className="name">Descuento: <label className="verfactura"> {factura.totalDescontado}  </label></p> 
                               <p className="namecan">Cancelado: <label className="verfactura"> {factura.cancelado}  </label></p> 
                            </div>
                            <div>
                              
                                <span className="detalle">
                            <Zelda className="nosee" href={`/Factura/ver/${factura.IdFactura}`}>Ver Detalle</Zelda> </span>
                                <span className="actualizar">
                                {permisoFactura[1] == '1' ? <Zelda className="nosee" href={`/Factura/actualizar/${factura.IdFactura}`}>Actualizar Factura</Zelda> : null}</span>
                                <span className="eliminar"> {permisoFactura[0] == '1' ? <Zelda className="nosee" href={`/Factura/borrar/${factura.IdFactura}`}>Borrar Factura</Zelda> : null}</span>
                               

                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
        </>
    )
}

/*Dialogo con botones */
/*class App extends Component {
  state = {
    isOpen: false
  }
  render() {
    return (
      <div className="App">
        <button onClick={(e) => this.setState({ isOpen: true })}>Open Dialog</button>

        <Dialog isOpen={this.state.isOpen} onClose={(e) => this.setState({ isOpen: false })}>
       
          Esta seguro que quiere eliminar el registro. <br/>
          <button onClick={(e) => this.setState({ isOpen: true })}>Si</button>
          <label>            </label>
          <button onClick={(e) => this.setState({ isOpen: true })}>No</button>
        </Dialog>
      </div>
    );
  }
}*/ 

export default withNavbar(addStore(FacturaView))




