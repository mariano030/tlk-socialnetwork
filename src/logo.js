import React from "react";
import { Link } from "react-router-dom";

// export default function Logo() {
//     return <div>THIS IS MY LOGO!</div>;
// }

export default class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <img className="logo-big" src="logo.jpg" />
                <div>
                    <div className="center">
                        <h3>JUST LIKE ALL THE OTHER SOCIAL MEDIA PLATFORMS</h3>
                    </div>
                </div>
            </div>
        );
    }
}
//
