import React, { Component } from "react";
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import { status } from './utils/events'
import Login from './components/Login'
import Navbar from "./components/Navbar";
import "./custom.css";

const RequireValidDB = (props) => { 
  const { children , ...restProps } = props
  return (
    <Route {...restProps}>
      { ! status.validDb ? <Redirect to='/setup' /> : children}
   </Route>
  )
}

const RequireLogin = ({ children, ...rest }) => {
  return (
    <RequireValidDB {...rest} >
      { ! status.login ? <Redirect to='/login'/> : children} 
    </RequireValidDB>
  )
}
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/setup'>
            </Route>
            <RequireValidDB path='/login'>
              <Login></Login>
            </RequireValidDB>
            <RequireLogin path='/' >
            </RequireLogin>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
