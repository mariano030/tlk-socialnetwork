import React from "react";

import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    methodInUploader() {
        this.props.mehtodInApp("hello Masala");
    }
    render() {
        return (
            <>
                Hi i am Uploader
                <div
                    onClick={() => {
                        this.methodInUploader();
                    }}
                >
                    click here to fire the function from app
                </div>
            </>
        );
    }
}
