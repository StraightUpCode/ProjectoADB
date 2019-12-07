import React from 'react'
import { addStore } from '../utils/store'
import Navbar from './Navbar'
import "../home.css"



const Home = ({ store, ...props }) => {
    console.log(Navbar)
    return (
        
        <>
        <Navbar></Navbar>


           
           <h1 className="homeh1">Bienvenido {store.user.nombre + ' ' + store.user.apellido}</h1> 
       
          
        </>
    )
}








export default addStore(Home)
