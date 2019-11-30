import { useEffect } from 'react'

const useListener = (listener, dependencias = [] ) => { 
    useEffect(() => {
        listener.listener()

        return () => listener.clear()
    },dependencias)
}

export default useListener
