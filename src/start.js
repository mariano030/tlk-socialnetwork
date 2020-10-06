import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./logged_out/welcome.js";
import App from "./app.js";

let elem = <App />;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));

// ReactDOM.render(<img, document.querySelector("main"));

// redirect logged out users to /welcome

// welcome does not need to be class, classy approach is to use a functional component

// if you change the filename of the first element (start.js) you will have
// to change it in WEBPACK
