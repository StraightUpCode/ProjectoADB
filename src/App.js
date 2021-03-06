import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/Login'
import Setup from './components/Setup'
import RegistrarUsuario from './components/RegisterUser'
import "./custom.css";

import Home from "./components/Home";
import Root from "./components/Root.js";
import FacturaView from "./components/FacturaView";
import { getDbConfig } from "./utils/events";
import FacturaInsertar from "./components/FacturaInsert";
import FacturaUpdate from "./components/FacturaUpdate";
import PlatilloView from './components/PlatilloView'
import FacturaViewDetalle from "./components/FacturaViewDetalle";
import InventarioView from "./components/InventarioView";
import UnidadView from "./components/UnidadView";
import UsuarioUpdate from "./components/UsuarioUpdate";
import UsuarioView from "./components/UsuarioView";
import UsuarioDetalle from "./components/UsuarioDetalle";
import InventarioInsert from "./components/InventarioInsert";
import PlatilloInsert from "./components/PlatilloInsert";
import PlatilloDetalle from "./components/PlatilloDetalle";
import PlatilloUpdate from "./components/PlatilloUpdate";
import InventarioUpdate from "./components/InventarioUpdate";
import SaView from "./components/SaView";
import InventarioHistorico from "./components/InventarioHistorico"


const RequireValidDB = ({ validDb, children, ...rest }) => {
  return (
    <Route {...rest}>
      {!validDb ? <Redirect to='/setup' /> : children}
    </Route>
  )
}

const RequireLogin = ({ isLogged, children,...rest }) => {
  console.log(rest)
  console.log(isLogged)
  return (
    <Route {...rest}>
      {!isLogged ? <Redirect to='/login' /> :children}
    </Route>
  )
  
}

const App = () => {
  const [session, setSession] = useState(false)
  const [validDb , setValidDb] = useState(getDbConfig())

  return (
    <>
      <Router>
        <Switch>
          <Route path='/setup'>
            <Setup setDB={setValidDb}/>
          </Route>
          <RequireValidDB validDb={validDb} path='/login'>
            <Login setLoginStatus={setSession}></Login>
          </RequireValidDB>
          <RequireLogin isLogged={session} path='/Usuario/añadir' >
            <RegistrarUsuario></RegistrarUsuario>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Factura/ver/:id' >
            <FacturaViewDetalle/>
          </RequireLogin>
          <RequireLogin isLogged={session}  path='/Factura/ver' >
            <FacturaView></FacturaView>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Factura/añadir' >
            <FacturaInsertar></FacturaInsertar>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Factura/actualizar/:id' >
            <FacturaUpdate></FacturaUpdate>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Platillo/ver/:id' >
            <PlatilloDetalle></PlatilloDetalle>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Platillo/actualizar/:id' >
            <PlatilloUpdate></PlatilloUpdate>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Platillo/ver' >
            <PlatilloView></PlatilloView>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Platillo/añadir' >
            <PlatilloInsert></PlatilloInsert>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Inventario/ver' >
            <InventarioView></InventarioView>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Inventario/añadir' >
            <InventarioInsert></InventarioInsert>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Inventario/actualizar/:id' >
            <InventarioUpdate></InventarioUpdate>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/InventarioHistorico/ver' >
            <InventarioHistorico></InventarioHistorico>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Unidad/ver' >
            <UnidadView></UnidadView>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Usuario/ver/:id' >
            <UsuarioDetalle></UsuarioDetalle>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Usuario/ver' >
            <UsuarioView></UsuarioView>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/Usuario/actualizar/:id' >
            <UsuarioUpdate></UsuarioUpdate>
          </RequireLogin>
          <RequireLogin isLogged={session} path='/sa/ver' >
            <SaView/>
          </RequireLogin>
          <RequireLogin isLogged={session}  path='/' >
              <Home />
          </RequireLogin>
        </Switch>
      </Router>
    </>
  )
}
export default App;
