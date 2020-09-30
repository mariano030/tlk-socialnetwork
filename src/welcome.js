import React from "react";
import { HashRouter, Route } from "react-router-dom";

import Logo from "./logo.js";

import Registration from "./registration.js";
import Login from "./login.js";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="center">
                <Logo />
                <HashRouter>
                    <div>
                        <Route exact path="/" component={Registration} />
                        <Route path="/login" component={Login} />
                    </div>
                </HashRouter>
            </div>
        );
    }
}
