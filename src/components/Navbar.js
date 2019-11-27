import React from "react";
import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <div className="ui secondary menu">
      <div className="header item">Menu</div>
      <a to='/'>Home</a>
      <a to='/facturas'>Facturas</a>
      <a to='/inventario'>Inventario</a>
      <a to='/inventario'>Configuracion</a>
    </div>
  );
};

export default Navbar;
