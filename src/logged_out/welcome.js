import React from "react";
import { HashRouter, Route } from "react-router-dom";

import Logo from "../logo.js";

import ResetPassword from "./reset.js";
import Registration from "./registration.js";
import Login from "./login.js";

export default class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="row">
                <div className="welcome">
                    <div className="center">
                        <Logo cssStyle={"logo-big"} />
                        <h1>tlk.</h1>
                    </div>
                </div>
                <div className="welcome-tools">
                    <HashRouter>
                        <div>
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                            <Route
                                path="/resetPassword"
                                component={ResetPassword}
                            />
                        </div>
                    </HashRouter>
                </div>
            </div>
        );
    }
}
