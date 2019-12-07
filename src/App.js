import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/Login'
import Setup from './components/Setup'
import RegistrarUsuario from './components/RegisterUser'
import "./custom.css";

import Home from "./components/Home";
import Root from "./components/Root.JS";
import FacturaView from "./components/FacturaView";
import { getDbConfig } from "./utils/events";


const RequireValidDB = ({ children, ...rest }) => {

const RequireValidDB = ({ children, validDb, ...rest }) => {

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


  console.log(session)
  return (
    <>
      <Router>
        <Switch>
          <Route path='/setup'>
            <Setup />
          </Route>
          <RequireValidDB validDb={validDb} path='/login'>
            <Login setLoginStatus={setSession}></Login>
          </RequireValidDB>
          <RequireLogin isLogged={session} path='/registrarUsuario' >
            <RegistrarUsuario></RegistrarUsuario>
          </RequireLogin>
          <RequireLogin isLogged={session}  path='/Factura/ver' >
            <FacturaView></FacturaView>
          </RequireLogin>
          <RequireLogin isLogged={session}  path='/' >
            <>
              <Home />
              <Root></Root>
            </>
          </RequireLogin>
        </Switch>
      </Router>
    </>
  )
}
export default App;
