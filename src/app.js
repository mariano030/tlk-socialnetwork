import React from "react";
import Example from "./example.js";
import Uploader from "./uploader.js";
import Logo from "./logo.js";
import ProfilePic from "./profilePic.js";
import Profile from "./profile.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "marcel",
            last: "buttersworth",

            imageUrl: null,
            uploaderIsVisible: true,
            cssStyle: null,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
    }
    async componentDidMount() {
        console.log("App just mounted");
        try {
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
        //     this.setState((uploaderIsVisible = false));
        // } else {
        //     this.setState({ uploaderIsVisible: true });
        // }
        console.log("uploaderIsVisible", this.state.uploaderIsVisible);
    }
    updateState(obj) {
        this.setState(obj);
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
                <Logo cssStyle={"logo-small"} />
                <header>
                    <div> I am App.</div>
                </header>
                <div className="main-container">
                    <ProfilePic
                        toggleUploader={this.toggleUploader}
                        first={this.state.first}
                        last={this.state.last}
                        imgUrl={this.state.url || "./img/default_avatar.jpg"}
                    />
                    <Profile
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                    />
                    <Example
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader updateState={this.updateState} />
                    )}
                </div>
            </>
        );
    }
}
