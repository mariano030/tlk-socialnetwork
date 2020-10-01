import React from "react";
import axios from "./axios.js"; // axios knows it's going to be included in front end
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props); // gotta do it to have this functionallity
        this.state = {};
        // this.submit = this.submit.bind(this);
    }
    handleChange({ target }) {
        // target refernces name from render
        //const first = this.state.first;
        //this.[target.name] = target.value; if you DONT want to change state with it
        this.setState({
            [target.name]: target.value,
        });
    }
    submit() {
        const { email, password } = this.state;
        console.log(email, password);
        axios
            .post(
                "/login",
                {
                    email,
                    password,
                },
                {
                    xsrfCookieName: "mytoken",
                    xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
                }
            )
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("an error occured on the login post", err);
            });
    }
    render() {
        return (
            <div className="center">
                <div className="text">Register now!</div>
                {this.state.error && (
                    <div className="message-error">
                        Oops! Soemthing went wrong. Totally your fault.
                    </div>
                )}
                {this.state.success && (
                    <div className="message-info">Welcome back!</div>
                )}
                <input
                    name="email"
                    placeholder="email"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="password"
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={() => this.submit()}>Submit</button>
                <div className="center">
                    <Link to="/password/reset/start">
                        Forgot my password...
                    </Link>
                    <Link to="/">Click here to register!</Link>
                </div>
            </div>
        );
    }
}

// when you use an arrow function it uses the normal scope this !!!

// every time you want to update the state you need to use setState() you can not change state directly

// any update only overwrites the info that is present in setState, everything else stays the same

// form data: when the button is clicked you pull them out of state -

// create register route - axios -> db.createUser
