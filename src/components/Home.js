import React from 'react'
import { addStore } from '../utils/store'
import { withNavbar } from './Navbar'
import "../home.css"



const Home = ({ store, ...props }) => {
    console.log(store)
    const nombre = store.user.nombre? store.user.nombre + ' ' + store.user.apellido : 'SA'
    return (
        
        <>

           <h1 className="homeh1">Bienvenido {nombre }</h1> 
      <div className="plsesteya" alt="Cerrar Sesion">  
<a className="cierrita" href="#popup1" alt="Cerrar Sesion"><li class="fas fa-sign-out-alt"></li></a></div>   

<div id="popup1" className="overlay">
    <div className="popupcito">
        <h2 className="cerrarito">Quiere cerrar Sesion?</h2>
        

        <span><button className="Cerrar">Si</button></span>
        <span className="nocer"><a className="noCerrar" href="#">No</a></span>
    </div>

</div>
       
          
        </>
    )
}








export default withNavbar(addStore(Home))
