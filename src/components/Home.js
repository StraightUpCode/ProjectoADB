import React from 'react'
import { addStore } from '../utils/store'
import Navbar from './Navbar'

const Home = ({ store, ...props }) => {
    console.log(Navbar)
    return (
        
        <>
           <Navbar></Navbar>
            <h1>Bienvendio {store.user.nombre + ' ' + store.user.apellido}</h1> 
        </>
    )
}

export default addStore(Home)