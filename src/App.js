import React, { Component } from "react";
import Navbar from "./components/Navbar";
import "./custom.css";
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route path='/' >
            </Route>
            <Route path='/setup'>
            </Route>
            <Route path='/config'>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
