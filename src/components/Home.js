import React from 'react'
import { addStore } from '../utils/store'
import { withNavbar } from './Navbar'
import "../home.css"
import useDialog from './hooks/useDialog'
import Dialog from './Dialog';
import Zelda from "../utils/Zelda";


const Home = ({ store, ...props }) => {
    const [isOpen, toggleOpen] = useDialog()
    console.log(store)
    const nombre = store.user.nombre? store.user.nombre + ' ' + store.user.apellido : 'SA'
    return (
        
        <>

           <h1 className="homeh1">Bienvenido {nombre }</h1> 
      <span onClick={toggleOpen} className="logoout" ><a className="logouta" href="#popup1" >Log Out</a></span>
      



      <Dialog isOpen={isOpen}><div id="popup1" className="popuppadre">
              <div className="botonhijo">
                <h2 className="cerrarito">Quiere cerrar sesion?</h2>


                {/*Coso para borrar la cosa*/}
                <div className="centrado">
                <span><Zelda href="login" className="cambito">Si</Zelda></span>


                <span onClick={toggleOpen}><button className="cambito" >No</button></span></div>
              </div>

            </div></Dialog>
       
          
        </>
    )
}








export default withNavbar(addStore(Home))
