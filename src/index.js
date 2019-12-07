import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { getDbConfig } from "./utils/events";

getDbConfig()
ReactDOM.render(<App />, document.getElementById("root"))





