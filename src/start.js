import React from "react";
import ReactDOM from "react-dom";

import Welcome from "./logged_out/welcome.js";
import App from "./app.js";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./redux/reducer.js";
import { Provider } from "react-redux";

import { init } from "./socket.js";

// socket.io
// import * as io from "socket.io-client";
// const socket = io.connect(); // starts a socket connection with server

// socket.on("welcome", (data) => console.log(data));

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem = (
    <Provider store={store}>
        {" "}
        <App />{" "}
    </Provider>
);

// let elem = <App />;

if (location.pathname == "/welcome") {
    elem = <Welcome />; // does not have access to redux
} else {
    init(store);
}

ReactDOM.render(elem, document.querySelector("main"));

// ReactDOM.render(<img, document.querySelector("main"));

// redirect logged out users to /welcome

// welcome does not need to be class, classy approach is to use a functional component

// if you change the filename of the first element (start.js) you will have
// to change it in WEBPACK
