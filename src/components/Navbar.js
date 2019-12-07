import React from "react";
import Zelda from "../utils/Zelda";


const navbarComposed = (rutas) => () => (<div> {rutas}</div>)
const rutas = []
export const createNavbar = (permisos) => {
  
  //arreglo de permisos
  for (const permiso of permisos) {
     //permiso es un objeto que contiene, el nombre de la tabla 
    // y el valor crud
    const miniRutas = []
    const crud = permiso.crud.toString(2).padStart(4,'0')
    for (let index = 0; index < crud.length; index += 1) {
      console.log(permiso.tabla, crud)
      //Determina que permisos tiene si ver, actualizar,etc
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
      const link = `/${permiso.tabla}/${accion}` // crea la url de la accion
      //a;ade un anchor tag a rutas 
      rutas.push((<Zelda key={rutas.length} href={link} >{permiso.tabla + ' '+ accion}</Zelda>))
    }
  }
  
}

export default navbarComposed(rutas); 
