import { useState } from 'react'


const useForm = (estadoInicial) => {
    const [formData, changeData] = useState(estadoInicial)

    const handleChange = e => { 
        console.log(e.target.name, e.target.value)
        const newData = {
            ...formData,
            [e.target.name]: e.target.value
        }
        console.log(newData)
        changeData(
           newData
        )
        console.log(formData)
    }
    const resetForm = () => changeData(estadoInicial)
    return [formData , handleChange, resetForm]
}
export default useForm