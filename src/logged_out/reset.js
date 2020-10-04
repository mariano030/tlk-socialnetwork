import React from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 1,
        };
    }
    handleChange({ target }) {
        // target refernces name from render
        //const first = this.state.first;
        // this.[target.name] = target.value; if you DONT want to change state with it
        this.setState({
            [target.name]: target.value,
        });
    }
    submit() {
        console.log("submit running");
        console.log("current display state:", this.state.display);
        if (this.state.display == 1) {
            // DISPLAY 1 - SEND RESET CODE
            console.log("display 1");
            const { email } = this.state;
            console.log(email);
            console.log("submit running");
            axios
                .post(
                    "/password/reset/start",
                    {
                        email,
                    },
                    {
                        xsrfCookieName: "mytoken",
                        xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
                    }
                )
                .then(({ data }) => {
                    if (data.success) {
                        this.setState({ display: 2 });
                    } else {
                        this.setState({
                            error: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log("an error occured on the login post", err);
                });
        } else if (this.state.display == 2) {
            // DISPLAY 2 - COMPARE RESET CODE
            console.log("display 2");
            const { email, code, newPass } = this.state;
            axios
                .post(
                    "password/reset/code",
                    { email, code, newPass },
                    {
                        xsrfCookieName: "mytoken",
                        xsrfHeaderName: "csrf-token", // the csurf middleware automatically checks this header for the token
                    }
                )
                .then((result) => {
                    console.log(result);
                    this.setState({ display: 3 });
                })
                .catch((err) => console.log(err));
        } else {
        }
    }
    render() {
        return (
            <div>
                <div> Password reset</div>
                {this.state.display == 1 && (
                    <div>
                        <input
                            name="email"
                            placeholder="email"
                            key="email"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button onClick={() => this.submit()}>Submit</button>
                    </div>
                )}

                {this.state.display == 2 && (
                    <div className="center">
                        <label>Confirmation code</label>
                        <input
                            name="code"
                            key="code"
                            placeholder="confirmation code"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <label for="newPass">New password</label>
                        <input
                            name="newPass"
                            type="password"
                            key="newPass"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button onClick={() => this.submit()}>Submit</button>
                        <span
                            onClick={() => this.setState({ display: 1 })}
                            className="link"
                        >
                            Send another code, please
                        </span>
                    </div>
                )}

                {this.state.display == 3 && (
                    <div>
                        <div>Your password was successfully changed.</div>
                        <Link to="/login" className="link">
                            Login now!
                        </Link>
                    </div>
                )}
            </div>
        );
    }
}
