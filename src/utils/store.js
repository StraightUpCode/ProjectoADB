import React from 'react'

const store = { 
    user: {
        permisos: []
    }
}
const addStore = (Component) => () => (
    <>
        <Component store={store} />
    </>
)
const addUser = (userData) => store.user = userData


export {
    store,
    addStore,
    addUser
}