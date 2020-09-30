import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./welcome.js";

let elem = <img className="logo-small" src="/logo-small.png" alt="logo" />;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));

// ReactDOM.render(<img, document.querySelector("main"));

// redirect logged out users to /welcome

// welcome does not need to be class, classy approach is to use a functional component
