import React from "react";
import axios from "../axios.js"; // axios knows it's going to be included in front end
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props); // gotta do it to have this functionallity
        this.state = {};
        // this.submit = this.submit.bind(this);
    }
    handleChange({ target }) {
        // target refernces name from render
        const first = this.state.first;
        //this.[target.name] = target.value; if you DONT want to change state with it
        this.setState({
            [target.name]: target.value,
        });
    }
    submit() {
        const { first, last, email, password } = this.state;
        console.log(first, last, email, password);
        axios
            .post("/register", {
                first,
                last,
                email,
                password,
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
    }
    render() {
        return (
            <div className="center">
                <div className="text">Welcome!</div>
                {this.state.error && (
                    <div className="message-error">
                        Oops! Soemthing went wrong. Totally your fault.
                    </div>
                )}
                {this.state.success && (
                    <div className="message-info">Welcome to the family.</div>
                )}
                <input
                    name="first"
                    placeholder="first name"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="last"
                    placeholder="last name"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="email"
                    placeholder="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <input
                    name="password"
                    type="password"
                    onChange={(e) => this.handleChange(e)}
                />
                <button onClick={() => this.submit()}>Submit</button>
                <div>
                    <Link to="/login" className="link">
                        Click here to Log in!
                    </Link>
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
