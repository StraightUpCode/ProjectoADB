import { useState } from "react"


const useDialog = () => {
    const [isOpen, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen(!isOpen)
    }
    return [isOpen, toggleOpen]
}

export default useDialog