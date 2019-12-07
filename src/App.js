import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/Login'
import Setup from './components/Setup'
import RegistrarUsuario from './components/RegisterUser'
import "./custom.css";
import "./estilo.js";
import Home from "./components/Home";
import Root from "./components/Root.JS";
<<<<<<< HEAD
=======
import FacturaView from "./components/FacturaView";
import { getDbConfig } from "./utils/events";
>>>>>>> 9bdc259d6f6600478a89e122834ac1418ed5a6c9

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
<<<<<<< HEAD
class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path='/setup'>
            <Root/>


            </Route>
            <RequireValidDB path='/login'>
              <Login></Login>
            </RequireValidDB>    
            <RequireLogin path='/registrarUsuario' >
              <RegistrarUsuario></RegistrarUsuario>
            </RequireLogin>
            <RequireLogin path='/' >
              <Home/>
            </RequireLogin>
          </Switch>
        </Router>
      </>
    );
  }
=======

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
>>>>>>> 9bdc259d6f6600478a89e122834ac1418ed5a6c9
}
export default App;
