import { useState } from 'react'


const useForm = (estadoInicial) => {
    const [formData, changeData] = useState(estadoInicial)

    const handleChange = e => changeData(
        {
            ...formData,
            [e.target.name] : e.target.value
        }
    )
    return [formData , handleChange]
}
export default useForm