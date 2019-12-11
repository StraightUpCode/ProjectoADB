import React, { useState, useEffect} from 'react'
import { createListener } from '../utils/events'
import useListener from './hooks/useListener'
import { addStore } from '../utils/store'
import Zelda from '../utils/Zelda'
import Navbar, { withNavbar } from './Navbar'
import Dialog from './Dialog';
import useDialog from './hooks/useDialog'
import {useHistory} from 'react-router-dom'

const BackButton = (props) => { 
    const history = useHistory()
    return (
      <a onClick={history.goBack} href="#" className="back" title="Regresar">
        <i class="fas fa-arrow-circle-left"></i>
      </a>
    )
  }



const PlatilloView= ({ store }) => { 
    console.log(store.user)
    const  permisoPermicial = {}
   // const permisoPermicial = store.user.permisos.find(el => el.tabla == 'Factura')
    //addPermisos([{tabla: 'Factura', crud: 15}])
    permisoPermicial.crud = 15
    const permisoPlatillo = permisoPermicial.crud.toString(2).padStart(4,'0')
    console.log(permisoPlatillo)
    const [isOpen, toggleOpen] = useDialog()
    const [deletedId, setDeleted] = useState()
    const [platillo, setPlatillo] = useState([
        {
            IdPlatillo: 1,
            nombre: '',
            precio: '',
            porcentajeDescuento : '',

        }
    ])
    const listener = createListener('get-platillos', (event, response) => {
      if (response.ok) {
        setPlatillo(response.response)
        }
        
        
        
    })
    const deleteListener = createListener('delete-platillo', (evento, respuesta) => {
        if (respuesta.ok) {
          listener.send()
          }
         
        })
    useListener(listener,platillo)
    useEffect(() => {
       listener.send()
    }, [])

    useListener(deleteListener)
    const deletePlatillo = (id) => () => {
      console.log('Delete Platillo', id)
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
    console.log(permisoPlatillo)
    return (
      <>
      <div className="backi">
       <BackButton></BackButton></div>
        <div>
            <div><h1 className="PlatilloH1">Factura</h1></div>

            <div>
                
                {
                    platillo.map((platillo) => (
                        <div className="ver">
                            <div >
                                <p className="name"> IdPlatillo: <label className="verfactura"> {platillo.IdPlatillo} </label></p>
                                <p className="name">Nombre: <label className="verfactura"> {platillo.nombre}  </label></p>
                                <p className="name">Precio: <label className="verfactura"> {platillo.precio}  </label></p>
                                <p className="namecan">% Descuento: <label className="verfactura"> {platillo.porcentajeDescuento}  </label> </p>
                            </div>
                            <div className="botoncitosprueba">
                                <span className="prueba">
                                    <Zelda className="nosee" href={`/Platillo/ver/${platillo.IdPlatillo}`}>Ver Detalle</Zelda> </span>
                                <span className="pruebaact">
                                    {permisoPlatillo[1] == '1' ? <Zelda className="nosee" href={`/Platillo/actualizar/${platillo.IdPlatillo}`}>Actualizar Platillo</Zelda> : null}</span>
                                    <span className="pruebael" onClick={preDelete(platillo.IdPlatillo)}><a className="borrita"href="#popup1">Borrar Platillo</a></span>


                            </div>
                        </div>
                    ))
                }
                <Dialog isOpen={isOpen}><div id="popup1" className="popuppadre">
              <div className="botonhijo">
                <h2 className="cerrarito">Quiere eliminar este platillo?</h2>


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


export default withNavbar(addStore(PlatilloView))