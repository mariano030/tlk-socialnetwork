import React from "react";
import Example from "./example.js";
import Uploader from "./uploader.js";
import Logo from "./logo.js";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "marcel",
            last: "buttersworth",
            imageUrl: null,
            uploaderIsVisible: false,
        };
        this.toggleUploader = this.toggleUploader.bind(this);
    }
    componentDidMount() {
        console.log("App just mounted");
        // a good place to make an axios request to our server
        // to get users information and put it in state

        // how to pass information to child elements?
    }
    toggleUploader() {
        console.log("toggle uploaderIsVisible");
        this.setState({ uploaderIsVisible: true });
    }
    methodInApp(arg) {
        console.log("blabla ich bin method in app");
        console.log(arg);
    }
    render() {
        return (
            <>
                <Logo />
                <header>
                    <div> I am App.</div>
                </header>
                <div className="main-container">
                    <Example
                        first={this.state.first}
                        last={this.state.last}
                        imageUrl={this.state.imageUrl}
                    />
                    {this.state.uploaderIsVisible && (
                        <Uploader methodInApp={this.methodInApp} />
                    )}
                </div>
            </>
        );
    }
}
