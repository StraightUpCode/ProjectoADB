import React from 'react'
import { withNavbar } from './Navbar'
import Root from './Root'
const SaView = () => { 
    return (
        <>
            <Root></Root> 
        </>
    )
}


export default withNavbar(SaView)