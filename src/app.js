import React from "react";
import Example from "./example.js";
import Uploader from "./uploader.js";
import Logo from "./logo.js";
import ProfilePic from "./profilePic.js";
import Profile from "./profile.js";
import Axios from "axios";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "marcel",
            last: "buttersworth",

            imageUrl: null,
            uploaderIsVisible: false,
            cssStyle: null,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
        this.updateState = this.updateState.bind(this);
    }
    async componentDidMount() {
        console.log("App just mounted");
        try {
            //const user = await Axios.get("/user");
        } catch (e) {
            console.log("error loading user data");
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
        console.log("state updated", obj);
        console.log(this.state);
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
                <header>
                    <div className="header-bg">
                        <Logo cssStyle={"logo-small"} />
                    </div>
                    <div className="row">
                        <h2>tlk.</h2>
                    </div>
                    <div className="colomn">
                        <ProfilePic
                            toggleUploader={this.toggleUploader}
                            first={this.state.first}
                            last={this.state.last}
                            imgUrl={this.state.url || "/img/default_avatar.jpg"}
                            myClassName="profile-picture"
                        />
                        <div className="align-right">
                            {this.state.first} {this.state.last}
                        </div>
                    </div>
                </header>
                <div className="main-container">
                    <Profile
                        toggleUploader={this.toggleUploader}
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                    />
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
            </>
        );
    }
}
