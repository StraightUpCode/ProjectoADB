import React, { useState } from 'react'
import{useParams } from 'react-router-dom'
import useListener from './hooks/useListener'
import useForm from './hooks/useForm'

const FacturaUpdate = (props) => {
    const { idFactura } = useParams()

    return (
        <>
            <div> 
                {idFactura}
        </div>
        </>)
}

export default FacturaUpdate