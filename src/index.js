import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { modificarConfig, sendLoginData, responseLogin, getDbConfig } from './utils/events'
//modificarConfig({db_host: 'localhst', db_name:'projecto'})
console.log(getDbConfig())
ReactDOM.render(<App />, document.getElementById("root"))


