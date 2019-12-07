import React from 'react'

const store = { 
    user: {}
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