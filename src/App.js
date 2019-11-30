import React, { Component } from "react";
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import { status } from './utils/events'
import Login from './components/Login'
import Setup from './components/Setup'
import RegistrarUsuario from './components/RegisterUser'
import "./custom.css";

const RequireValidDB = ({ children, ...rest }) => {
  return (
    <Route {...rest}>
      {!status.validDb ? <Redirect to='/setup' /> : children}
    </Route>
  )
}

const RequireLogin = (props) => {
  const {children , ...rest} = props
  return (
    <Route {...rest}>
      {!status.login ? <Redirect to='/login' /> : children}
    </Route>
  )
  
}
class App extends Component {
  render() {
    console.log(RegistrarUsuario)
    return (
      <>
        <Router>
          <Switch>
            <Route path='/setup'>
              <Setup/>
            </Route>
            <RequireValidDB path='/login'>
              <Login></Login>
            </RequireValidDB>    
            <RequireLogin path='/registrarUsuario' >
              <RegistrarUsuario></RegistrarUsuario>
            </RequireLogin>
          </Switch>
        </Router>
      </>
    );
  }
}
export default App;
