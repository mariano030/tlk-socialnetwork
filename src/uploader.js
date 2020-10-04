import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            cssStyle: "blue",
        };
    }
    componentDidMount() {
        // console.log('Uploader just mounted');
    }
    methodInUploader() {
        console.log("running methodInUploader");
        this.props.methodInApp("Hello Masala");
    }
    handleChange(e) {
        console.log("handle changed!");
        this.setState({ file: e.target.files[0] });
    }
    async updatePicture() {
        if (this.state.file) {
            console.log("file selected");
            console.log("axios starten");
            const formData = new FormData();
            formData.append("file", this.state.file);
            const { data } = await axios.post("/profile", formData);
            console.log("data from index.js", data);
            this.props.updateState({ imageUrl: data.imageUrl }); // data...
            setTimeout(500, this.props.toggleUploader());
        } else {
            this.setState({ cssStyle: "highlight" });
        }
    }
    render() {
        return (
            <>
                <div className="modal column">
                    <div className="modal-header">
                        <h4> Upload a new profile picture </h4>
                        <h4
                            className="close-modal"
                            onClick={this.props.toggleUploader}
                        >
                            X
                        </h4>
                    </div>
                    <input
                        className={this.state.cssStyle}
                        onChange={(e) => this.handleChange(e)}
                        name="file"
                        type="file"
                    ></input>
                    <div
                        onClick={() => this.updatePicture()}
                        className="button"
                    >
                        Upload now!
                    </div>
                </div>
            </>
        );
    }
}
