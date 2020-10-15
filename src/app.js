import React from "react";
import Axios from "axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { unmountComponentAtNode, render } from "react-dom";

// redux  -> moved to start
//import { createStore, applyMiddleware } from "redux";
// import reduxPromise from "redux-promise";
// import reducer from "./redux/reducer";
//const store = createStore(reducer, applyMiddleware(reduxPromise)); -> moved to start

/// TIME AGO
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// COMPONENTS
import Logo from "./logo.js";
import Profile from "./profile.js";
import ProfilePic from "./profilePic.js";
import Uploader from "./uploader.js";
import OtherProfile from "./otherProfile.js";
import FindPeople from "./findPeople.js";
import Friends from "./friends.js";
import ModalMessage from "./modalMessage";
import Chat from "./chat.js";
import OnlineUsers from "./onlineUsers";
import PrivateChat from "./privateChat";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "First",
            last: "Lastname",
            // userId: null,

            uploaderIsVisible: false,
            cssStyle: null,
            error: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateState = this.updateState.bind(this);
        this.toggleError = this.toggleError.bind(this);
    }
    async componentDidMount() {
        console.log("App just mounted");
        try {
            const user = await Axios.get("/api/user");
            this.updateState(user.data);
            //unmountComponentAtNode(document.getElementById("preload"));
            //console.log("state updated with", user.data);
        } catch (e) {
            console.log("error loading user data", e);
            this.updateState({ error: true });
        }
        // a good place to make an axios request to our server
        // to get users information and put it in state

        // how to pass information to child elements?
    }
    toggleError() {
        console.log("toggeling error modal");
        this.setState({
            error: !this.state.error,
        });
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
        //     return (
        //         <img
        //             src="/img/coffee_cup.gif"
        //             alt="still loading or loading unsuccessful"
        //         ></img>
        //     );
        // maybe show a spinner?
        // maybe a skeleton element?
        // } else {
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
                        <div className="nav">
                            <Link
                                to="/"
                                className="nav-link"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="nav1">View Profile</div>
                            </Link>
                            <Link
                                to="/friends"
                                className="nav-link"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="nav2">View Friends</div>
                            </Link>
                            <Link
                                to="/members"
                                className="nav-link"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="nav3">Search</div>
                            </Link>
                            <Link
                                to="/chat"
                                className="nav-link"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="nav4">Talk</div>
                            </Link>
                        </div>
                    </header>
                    <OnlineUsers userId={this.state.userId} />
                    <div className="main-container">
                        {this.state.error && (
                            <div className="modal">
                                <div className="column"></div>
                                <div className="text">
                                    Oh no! Something went wrong
                                </div>
                                <div
                                    className="button"
                                    onClick={this.toggleError}
                                >
                                    Ok
                                </div>
                            </div>
                        )}
                        <Route
                            exact
                            path="/friends"
                            render={() => (
                                <>
                                    <Friends />
                                </>
                            )}
                        />
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <>
                                    <Profile
                                        toggleUploader={this.toggleUploader}
                                        updateState={this.updateState}
                                        first={this.state.first}
                                        last={this.state.last}
                                        imageUrl={this.state.imageUrl}
                                        bio={this.state.bio}
                                    />
                                </>
                            )}
                        />
                        <Route
                            path="/users/:id"
                            render={(props) => (
                                <>
                                    <OtherProfile
                                        key={props.url}
                                        match={props.match}
                                        history={props.history}
                                        updateState={this.updateState}
                                    />
                                    <PrivateChat
                                        match={props.match}
                                        history={props.history}
                                    />
                                </>
                            )}
                        />

                        <Route
                            path="/members/"
                            render={(props) => <FindPeople />}
                        />
                        {/* if we give props we need to use render= but with no porps use component= */}
                        <Route exact path="/chat" component={Chat} />
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
        // }
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
