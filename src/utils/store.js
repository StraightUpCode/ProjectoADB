import React, { useState, useEffect } from 'react'

const store = { 
    user: {
        permisos: []
    }
}

const addUser = (userData) => store.user = userData
const addPermisos = (permisos) => {
    console.log('cambiando permiso...')
    store.user.permisos = permisos
    console.log(store.user)
}

const addStore = (Component) => () => {

    const [storeComponente, setStore] = useState(store)
    console.log(store)
    useEffect(() => {
        console.log(store)
        console.log(storeComponente)
        setStore(store)
        console.log('store actaulizada')
        console.log(storeComponente)
    },[store])
 
    const guardarPermisos = addPermisos
    return(
        <>
            <Component store={storeComponente} addPermisos={guardarPermisos}/>
        </>
    )
}


export {
    store,
    addStore,
    addUser,
    addPermisos
}