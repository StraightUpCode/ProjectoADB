import React from "react";
import { Link } from "react-router-dom"


let Navbar
export const createNavbar = (permisos) => {
  const rutas = []
  //arreglo de permisos
  for (const permiso of permisos) {
     //permiso es un objeto que contiene, el nombre de la tabla 
    // y el valor crud
    const miniRutas = []
    const linkBase = ''
    const crud = permiso.crud.toString(2)
    for (let index = 0; index < crud.length; index += 1) {
      if (crud.charAt(index) == '1') {
        switch (index) {
          case 0: {
            miniRutas.push('borrar')
            break;
          }
          case 1: {
            miniRutas.push('actualizar')
            break;
          }
          case 2: {
            miniRutas.push('anadir')
            break;
          }
          case 3: {
            miniRutas.push('ver')
            break;
          }
        }
      }
    }
    for (const accion of miniRutas) {
      const link = `/${permiso.tabla}/${accion}`
      rutas.push((<a href={link} ></a>))
    }
  }

  Navbar = (
    <div>
      {rutas}
    </div>
  )
  
}

export default Navbar; 

