import React from "react"
import Zelda from "../utils/Zelda";
import {esquema} from '../esquemaDb'
import { setPermisos } from "../utils/store"
import {Alert, Moda, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


const rutas = []



const sa = Object.keys(esquema).map((val) => ({
  tabla: val,
  crud: 15
}))




const navbarComposed = (rutas) => () => (
 <>


<div className="wrapper">

  <div className="sidebar">
  
    <h2 className="permisito">Permisos</h2>
    <a  onClick={this.toggleModal.modal.bind(this)} href="#" className="logout" title="Cerrar sesion">
      <i class="fas fa-sign-out-alt"></i>
    </a>
      
      {rutas}

  </div>
 
  </div>
  
 
  

 </>
  


)



export const createNavbar = (permisos) => {
  console.log(permisos)
  let permisosFinal 
  if (permisos.find(el => el.tabla == 'sa')) {
    console.log(permisos)
    console.log(sa)
    permisosFinal = [ ...permisos, ...sa]
    
  } else {
    permisosFinal = permisos
  }
  
  //arreglo de permisos
  for (const permiso of permisosFinal) {
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
export const withNavbar = (Component) => () => <>{navbarComposed(rutas)()} <Component/> </>
export default navbarComposed(rutas); 
