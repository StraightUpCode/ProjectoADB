import React from 'react'
import { addStore } from '../utils/store'
import Navbar from './Navbar'
import "../home.css"



const Home = ({ store, ...props }) => {
    console.log(store)
    const nombre = store.user.nombre? store.user.nombre + ' ' + store.user.apellido : 'SA'
    return (
        
        <>
    
        <Navbar></Navbar>
        
           <h1 className="homeh1">Bienvenido {nombre }</h1> 
       
          
        </>
    )
}








export default addStore(Home)
