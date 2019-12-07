import React, { Component } from "react";
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import { status } from './utils/events'
import Login from './components/Login'
import Setup from './components/Setup'
import RegistrarUsuario from './components/RegisterUser'
import "./custom.css";
import "./estilo.js";
import Home from "./components/Home";
import Root from "./components/Root.JS";

const RequireValidDB = ({ children, ...rest }) => {
  return (
    <Route {...rest}>
      {!status.validDb ? <Redirect to='/setup' /> : children}
    </Route>
  )
}

const RequireLogin = (props) => {
  const { children, ...rest } = props
  console.log(children)
  return (
    <Route {...rest}>
      {!status.login ? <Redirect to='/login' /> : children}
    </Route>
  )
  
}
class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path='/setup'>
            <Setup />
            </Route>
            <RequireValidDB path='/login'>
              <Login></Login>
            </RequireValidDB>    
            <RequireLogin path='/registrarUsuario' >
              <RegistrarUsuario></RegistrarUsuario>
            </RequireLogin>
            <RequireLogin path='/' >
              <>
                <Home />
                <Root></Root>
              </>
            </RequireLogin>
          </Switch>
        </Router>
      </>
    );
  }
}
export default App;
