import React from "react";
import Axios from "axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { unmountComponentAtNode, render } from "react-dom";

import Logo from "./logo.js";
import Profile from "./profile.js";
import ProfilePic from "./profilePic.js";
import Uploader from "./uploader.js";
import OtherProfile from "./otherProfile.js";
import FindPeople from "./findPeople.js";
import ModalMessage from "./modalMessage";
//import Example from "./example.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "First",
            last: "Lastname",
            // userId: null,

            uploaderIsVisible: false,
            cssStyle: null,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    async componentDidMount() {
        console.log("App just mounted");
        try {
            const user = await Axios.get("/api/user");
            this.updateState(user.data);
            unmountComponentAtNode(document.getElementById("preload"));
            //console.log("state updated with", user.data);
        } catch (e) {
            console.log("error loading user data", e);
        }
        // a good place to make an axios request to our server
        // to get users information and put it in state

        // how to pass information to child elements?
    }
    toggleUploader() {
        console.log("toggle uploaderIsVisible");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
        console.log("uploaderIsVisible", this.state.uploaderIsVisible);
    }
    updateState(obj) {
        this.setState(obj);
        console.log("updateState APP : state updated", obj);
        console.log("state after update", this.state);
    }
    methodInApp(arg) {
        console.log("blabla ich bin method in app");
        console.log(arg);
    }
    render() {
        // if (!this.state.id) {
        // return (
        //     <img
        //         src="/img/skeleton-not-dead.gif"
        //         alt="still loading or loading unsuccessful"
        //     ></img>
        // );
        // maybe show a spinner?
        // maybe a skeleton element?

        return (
            <>
                <BrowserRouter>
                    <header>
                        <div className="header-bg">
                            <Link to="/members/" className="link">
                                <Logo cssStyle={"logo-small"} />
                            </Link>
                        </div>
                        <div className="row-left">
                            <Link
                                to="/"
                                className="link"
                                style={{ textDecoration: "none" }}
                            >
                                <h2>tlk.</h2>
                            </Link>
                        </div>
                        <div className="column">
                            <ProfilePic
                                toggleUploader={this.toggleUploader}
                                first={this.state.first}
                                last={this.state.last}
                                imageUrl={
                                    this.state.imageUrl ||
                                    "/img/default_avatar.png"
                                }
                                myClassName="profile-picture"
                            />
                            <div className="loggedin-user">
                                <Link
                                    to="/"
                                    className="link"
                                    style={{ textDecoration: "none" }}
                                >
                                    Hi, {this.state.first}.
                                </Link>
                                {/* <img
                                src="./img/door.png"
                                className="icon"
                                alt="logout"
                            ></img> */}
                            </div>
                        </div>
                    </header>
                    <div className="main-container">
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    toggleUploader={this.toggleUploader}
                                    updateState={this.updateState}
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageUrl={this.state.imageUrl}
                                    bio={this.state.bio}
                                />
                            )}
                        />
                        <Route
                            path="/users/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.url}
                                    match={props.match}
                                    history={props.history}
                                    updateState={this.updateState}
                                />
                            )}
                        />

                        <Route
                            path="/members/"
                            render={(props) => <FindPeople />}
                        />

                        {/* <Route path="/users:id" componnent={OtherProfile} /> */}
                        {/* <Example
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                    /> */}
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                updateState={this.updateState}
                                toggleUploader={this.toggleUploader}
                            />
                        )}
                        {this.state.modalOpen && (
                            <ModalMessage
                                toggleUploader={this.toggleUploader}
                                message={this.state.message}
                                destination={this.state.destination}
                                button={this.state.button}
                            />
                        )}
                        {/* <div className="tiny">
                        Icons made by{" "}
                        <a
                            href="https://www.flaticon.com/authors/freepik"
                            title="Freepik"
                        >
                            Freepik
                        </a>{" "}
                        from{" "}
                        <a href="https://www.flaticon.com/" title="Flaticon">
                            {" "}
                            www.flaticon.com
                        </a>
                        Header illustration by Pete Ryan
                    </div> */}
                    </div>
                </BrowserRouter>
            </>
        );
    }
}

// browser router:
// we cannot user browser route component = syntax if we want to pass props
// we can link to other components wihtout handing over props

// render updates the props and the link:component version is a bit
// slower as it creates a new instance of the component

// using the render function and a function with the component as the arg for render
// use exact path ESPECIALLY with "/" to liberate all sub paths...

// inside render: interpreted as one line - no return needed with ( )...
{
    /* <Route exact path="/" render={()=> (                    <Profile
                        toggleUploader={this.toggleUploader}
                        updateState={this.updateState}
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                        bio={this.state.bio}
                    />)} */
}

// update routes: "/api/user"

// routes:
// api/user - loading user data
