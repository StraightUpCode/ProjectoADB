import React, {useState, useEffect} from 'react'
import { esquema } from '../esquemaDb'


console.log(esquema)
const Permisos = ({ setPermisos }) => {
   const esquemaDb = Object.keys(esquema).reduce((acc, cur) => {
        acc[cur] = 0
        return acc
    }, {}) 
    const [permisosTablas, cambiarPermisos] = useState(esquemaDb)

    const handleChange = e => {
        const tabla = e.target.name
        let valor = parseInt(e.target.value)
        if (permisosTablas[tabla] % 2 == 0 && valor >=  4) {
            valor += 1
        }

        const nuevoValor = permisosTablas[tabla] + valor
        if ( nuevoValor <= 15 && valor != 0) {
            cambiarPermisos({ ...permisosTablas,[tabla]: nuevoValor })
        } else if(valor == 0) {
            cambiarPermisos({ ...permisosTablas,[tabla]: valor })
        }
    }

    useEffect(() => {
        console.log(permisosTablas)
        setPermisos(permisosTablas)
    },[permisosTablas])

    return (
        <div className="checkboxpedo">
            {
                Object.entries(permisosTablas).map(([llave , valor], index) => {
                    const val = valor.toString(2).padStart(4,'0')
                    return (
                        <div key={index}>
                            <p>{llave}</p>
                       
                                <input className="check" onChange={handleChange} type='checkbox'  name={llave} value='0' checked={!valor != 0}></input>
                                <label className="labelcheck" >Ninguno</label>

                                
                            <input className="check" onChange={handleChange} type='checkbox'  name={llave} value='1' checked={val.charAt(3) == '1'}></input>
                            <label className="labelcheck" >Leer</label>
         
                               
                            <input className="check" onChange={handleChange} type='checkbox'  name={llave} value='2' checked={val.charAt(2) == '1'}></input>   
                            <label className="labelcheck">Escribir</label>

                        
                           
                            <input className="check" onChange={handleChange} type='checkbox'  name={llave} value='4' checked={val.charAt(1) == '1'}></input>
                            <label className="labelcheck">Actualizar</label>
                            

                            <input className="check" onChange={handleChange} type='checkbox'  name={llave} value='8' checked={val.charAt(0) == '1'}></input> 
                            <label className="labelcheck">Borrar</label>
                           
                        </div>    
                    )
                    
                })
            }
        </div>
    )
}

export default Permisos