import React from "react";
import Axios from "./axios";

export default class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            editingMode: false,
        };
    }
    //not needed atm
    toggleEdit() {
        this.setState({ editingMode: !this.state.editingMode });
    }
    putInEditMode() {
        //because setState is async it might take a (very short) while to update,
        // pass it a callback console.log that will be executed after the update
        this.setState({ editingMode: true }, () =>
            console.log("the new state: ", this.state)
        );
    }
    render() {
        if (this.state.editingMode) {
            return (
                <>
                    <h1>I am the Bio Editor in EDIT MODE</h1>;
                    <textarea defaultValue="Something..."></textarea>
                    <button>SAVE</button>
                </>
            );
        } else {
            return;
            <>
                <h1>I am the Bio Editor, kicking back.</h1>;
                <button onClick={() => this.putInEditMode()}>
                    {this.props.bio ? "Edit Bio" : "Add Bio"}
                    ADD OR EDIT
                </button>
            </>;
        }
    }
}

// handover stuff to function based element?? -> props
// props can be destructured on receival or refered to as props.keyName

// handover stuff to class based components?

// { this.props.valeIsTrueOrFalsy ? "truthy option" : "the other option-aka false"}