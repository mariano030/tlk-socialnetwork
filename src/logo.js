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
                <img
                    className={("logo", this.props.cssStyle)}
                    src="/img/logo_512.png"
                />
            </div>
        );
    }
}
//
