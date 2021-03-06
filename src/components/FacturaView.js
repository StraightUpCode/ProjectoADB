import React, { useState, useEffect} from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { addStore } from '../utils/store'
import Zelda from '../utils/Zelda'
import Navbar, { withNavbar } from './Navbar'

import {useHistory} from 'react-router-dom'
import useDialog from './hooks/useDialog'
import Dialog from './Dialog'



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
  const permisoPermicial = {}
   // const permisoPermicial = store.user.permisos.find(el => el.tabla == 'Factura')
    //addPermisos([{tabla: 'Factura', crud: 15}])
    permisoPermicial.crud = 15
    const permisoFactura = permisoPermicial.crud.toString(2).padStart(4,'0')
  console.log(permisoFactura)
    const [isOpen, toggleOpen] = useDialog()
    const [deletedId, setDeleted] = useState()
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
    const listener = createListener('get-facturas', (event, response) => {
      if (response.ok) {
        setFacturas(response.data)
        }
    })
  const deleteListener = createListener('delete-factura', (evento, respuesta) => {
    if (respuesta.ok) {
      listener.send()
      }
     
    })
    useListener(listener,facturas)
    useEffect(() => {
       listener.send()
    }, [])
    useListener(deleteListener)
    const deleteFactura = (id) => () => {
      console.log('Delete Factura', id)
      deleteListener.send(id)
    }
  const preDelete = (id) => e => {
    setDeleted(id)
    toggleOpen()
  }
  const confirmarDelete = e => {
    deleteListener.send(deletedId)
    toggleOpen()

  }
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
                            <div className="botoncitosprueba">
                              
                                <span className="prueba">
                            <Zelda className="nosee" href={`/Factura/ver/${factura.IdFactura}`}>Ver Detalle</Zelda> </span>
                                <span className="pruebaact">
                                {permisoFactura[1] == '1' ? <Zelda className="nosee" href={`/Factura/actualizar/${factura.IdFactura}`}>Actualizar Factura</Zelda> : null}</span>
                                <span className="pruebael" onClick={preDelete(factura.IdFactura)}><a className="borrita"href="#popup1">Borrar Factura</a></span>


                            </div>
                        </div>
                    ))

                    /*{permisoFactura[0] == '1' ? <Zelda className="nosee" href={`/Factura/borrar/${factura.IdFactura}`}>Borrar Factura</Zelda> : null}*/
                }
            <Dialog isOpen={isOpen}><div id="popup1" className="popuppadre">
              <div className="botonhijo">
                <h2 className="cerrarito">Quiere eliminar esta factura?</h2>


                {/*Coso para borrar la cosa*/}
                <div className="centrado">
                <span><button onClick={confirmarDelete} className="cambito">Si</button></span>


                <span onClick={toggleOpen}><button className="cambito" >No</button></span></div>
              </div>

            </div></Dialog>
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




