import React, {useState, useEffect} from 'react'
import { esquema } from '../esquemaDb'


const Permisos = ({ setPermisos, permisos }) => {
   const esquemaDb = Object.keys(esquema).reduce((acc, cur) => {
        acc[cur] = 0
        return acc
   }, {}) 
    console.log(permisos)
    const [permisosTablas, cambiarPermisos] = useState({ ...esquemaDb })
    useEffect(() => {
        let shouldUpdate = false
        console.log(permisos)
        if (permisos) {
            for (const key of Object.keys(permisosTablas)) {
                if (permisos[key] && permisos[key] != permisosTablas[key]) {
                    shouldUpdate = true
                    break;
                }
            }
        }
        if (shouldUpdate) {
            cambiarPermisos({ ...esquemaDb ,...permisos})
        }
    },[permisos])
    const handleChange = e => {
        const tabla = e.target.name
        const temp = parseInt(e.target.value)
        if (temp > 0) {
            const valor = permisosTablas[tabla] % 2 == 0 && temp >= 4 ? temp + 1 : temp
            const permisoActualBinario = valor.toString(2).padStart(4, '0')
            const permisoViejoBinario = permisosTablas[tabla].toString(2).padStart(4, '0')
            const permiso = []
            for (let i = 0; i <= 3; i++) {
                if (permisoActualBinario[i] == permisoViejoBinario[i]) {
                    permiso.push('0')
                } else {
                    permiso.push('1')
                }
            }
            if (permiso[0] == '1' || permiso[1] == '1') {
                permiso[3] = '1'
            }
            console.log('Current ', permisoActualBinario)
            console.log('Old ', permisoViejoBinario)
            console.log('Result Binario', permiso.join(''))
            const nuevoValor = parseInt(permiso.join(''), 2)
            console.log('Result ', nuevoValor)
            cambiarPermisos({ ...permisosTablas, [tabla]: nuevoValor })
        } else {
            cambiarPermisos({ ...permisosTablas, [tabla]: 0 })

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
            <div>
                <p>SA</p>
                <input className="check" onChange={handleChange} type='checkbox' name='sa' value='1' checked={permisosTablas.sa == 1}></input> 
            </div>
        </div>
    )
}

export default Permisos