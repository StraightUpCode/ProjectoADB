import { useState } from 'react'


const useForm = (estadoInicial) => {
    const [formData, changeData] = useState(estadoInicial)
    const handleChange = (e) => { 
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const newData = {
            ...formData,
            [e.target.name]: value
        }
        changeData(newData)
        console.log(newData)
    }
    const resetForm = () => changeData(estadoInicial)
    return [formData , handleChange, resetForm]
}
export default useForm