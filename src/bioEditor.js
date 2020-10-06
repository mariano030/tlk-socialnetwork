import React from "react";
import Axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingMode: false,
            // bio: this.props.bio,
        };
    }
    //not needed atm
    toggleEditMode() {
        this.setState({ editingMode: !this.state.editingMode });
    }
    putInEditMode() {
        //because setState is async it might take a (very short) while to update,
        // pass it a callback console.log that will be executed after the update
        this.setState({ editingMode: true }, () =>
            console.log("the new state: ", this.state)
        );
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value });
        console.log(target.defaultValue);
        console.log("this.state.bio", this.state.bio);
    }
    async updateBio() {
        console.log(this.bio);
        const response = await Axios.post("/updatebio", {
            bio: this.state.bio,
        });
        if (response) {
            this.props.updateState({ bio: this.state.bio });
        }
        console.log("response from index", response);
        this.setState({ editingMode: false });
    }
    render() {
        if (this.props.canEdit) {
            if (this.state.editingMode) {
                return (
                    <>
                        <h4>Bio:</h4>{" "}
                        <span className="text">
                            Please add a short description of yourself ...
                        </span>
                        <textarea
                            name="bio"
                            defaultValue={this.props.bio || ""}
                            onChange={(e) => this.handleChange(e)}
                        ></textarea>
                        <div
                            className="button"
                            onClick={() => this.updateBio()}
                        >
                            Save
                        </div>
                        <div
                            className="button"
                            onClick={() => this.toggleEditMode()}
                        >
                            Cancel
                        </div>
                    </>
                );
            } else {
                return (
                    <>
                        <h4>Bio:</h4>
                        <div className="text">
                            {this.props.bio || "No bio yet ..."}
                        </div>
                        {/* <button onClick={() => this.putInEditMode()}>
                            {this.props.bio ? "Edit Bio" : "Add Bio"}
                        </button> */}
                        <div
                            onClick={() => this.putInEditMode()}
                            className="button"
                        >
                            {this.props.bio ? "Edit Bio" : "Add Bio"}
                        </div>
                    </>
                );
            }
        } else {
            return (
                <>
                    <h4>Bio:</h4>
                    <div className="text">
                        {this.props.bio || "No bio yet ..."}
                    </div>
                </>
            );
        }
    }
}

// handover stuff to function based element?? -> props
// props can be destructured on receival or refered to as props.keyName

// handover stuff to class based components?

// { this.props.valeIsTrueOrFalsy ? "truthy option" : "the other option-aka false"}
