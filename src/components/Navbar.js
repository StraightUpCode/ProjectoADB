import React from "react"
import Zelda from "../utils/Zelda";



const rutas = []




const navbarComposed = (rutas) => () => (
  

  <div className="wrapper">
  <div className="sidebar">
    <h2 className="permisito">Permisos</h2>
      
      {rutas}

  </div>

  </div>
 



)
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

    const array = []
    for (const accion of miniRutas) {
      const link = `/${permiso.tabla}/${accion}` // crea la url de la accion
      //a;ade un anchor tag a rutas 
      array.push((<li className="rutas"><Zelda className="pedo"  key={rutas.length} href={link} >{permiso.tabla + ' '+ accion} </Zelda></li> ))
      

    }
    
    
rutas.push((
  
       <ul>
        
         {array}


       </ul>


    ))


  }

  
  
}

export default navbarComposed(rutas); 
