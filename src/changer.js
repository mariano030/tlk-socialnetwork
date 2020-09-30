import React from "react";

export default class Changer extends React.Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        console.log("this.state", this.state);
        return (
            <div>
                <input
                    onChange={(e) => this.setState({ name: e.target.value })}
                ></input>
                <div> {this.state.name}</div>
            </div>
        );
    }
}
