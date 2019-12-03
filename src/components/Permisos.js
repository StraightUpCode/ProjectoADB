import React, {useState, useEffect} from 'react'


const Permisos = ({ setPermisos }) => {
    const [permisosTablas, cambiarPermisos] = useState({
        Factura : 0,
        Platillo: 0,
        Inventario: 0,
        Unidad: 0,
    })

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
        <div>
            {
                Object.entries(permisosTablas).map(([llave , valor], index) => {
                    const val = valor.toString(2).padStart(4,'0')
                    return (
                        <div key={index}>
                            <p>{llave}</p>
                            <label>
                                Ninguno
                                <input onChange={handleChange} type='checkbox' name={llave} value='0' checked={!valor != 0}></input>
                            </label>
                            <label>
Leer
                            <input onChange={handleChange} type='checkbox' name={llave} value='1' checked={val.charAt(3) == '1'}></input>
                            </label>
                            <label>
                                Escribir
                            <input onChange={handleChange} type='checkbox' name={llave} value='2' checked={val.charAt(2) == '1'}></input>

                            </label>
                            <label>
                            Actualizar
                            <input onChange={handleChange} type='checkbox'name={llave} value='4' checked={val.charAt(1) == '1'}></input>
                            </label>
                            <label>
                            Borrar
                            <input onChange={handleChange} type='checkbox' name={llave} value='8' checked={val.charAt(0) == '1'}></input> 
                            </label>
                        </div>    
                    )
                    
                })
            }
        </div>
    )
}

export default Permisos