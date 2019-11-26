import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { modificarConfig, sendLoginData } from './utils/config'
modificarConfig({db_host: 'localhost', db_name:'projecto'})
sendLoginData('sa','Roberto4$')
ReactDOM.render(<App />, document.getElementById("root"))


