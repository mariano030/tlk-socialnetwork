import React from "react";
import Axios from "./axios";

import ProfilePic from "./profilePic.js";
import BioEditor from "./bioEditor.js";
import ModalMessage from "./modalMessage";
import FriendButton from "./hooks/friendButton.js";
//import { unmountComponentAtNode } from "react-dom";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        //unmountComponentAtNode(document.getElementById("preload"));

        console.log("this.props.match", this.props.match);
        console.log("this.props.match.params", this.props.match.params);
        const requestUrl = "/api/other-user/" + this.props.match.params.id;
        console.log(requestUrl);
        try {
            const otherUser = await Axios.get(requestUrl);
            if (otherUser.data.same) {
                // sam is true if user is viewing his own page
                this.props.history.push("/");
            } else if (!otherUser.data.first) {
                console.log("user not found");
                // alternative: this.props.history.goBack();
                this.props.history.push("/");
                // this.setState({
                //     modalOpen: true,
                //     message: "No user found",
                //     destination: "/",
                //     button: "Okay then...",
                // });
            } else {
                this.setState(otherUser.data);
                console.log("local state updated!");
                console.log("this.state", this.state);
            }
        } catch (err) {
            console.log("error", err);
        }
    }
    // maybe the don't render solution ivana had? below?
    render() {
        // const imageUrl = this.state.imageUrl;
        // const bio = this.state.bio;
        // or const { bla } = this.props

        console.log("this.props.match.params", this.props.match.params.id);
        const { imageUrl, first, last, bio, userId } = this.state;
        console.log("imageUrl", imageUrl);
        return (
            <>
                {/* {this.state.notFound && (
                    <ModalMessage
                        message="User not found"
                        button="Go back"
                        destination={this.props.history.goBack()}
                    />
                )} */}
                {/* <h4>Get to know other users...</h4> */}
                {this.state.modalOpen && (
                    <ModalMessage
                        message="user not found"
                        destination={this.state.destination}
                        button={this.state.button}
                    />
                )}
                <div className="row">
                    <div className="column-left-40">
                        <div className="column">
                            <ProfilePic
                                imageUrl={imageUrl}
                                myClassName="profile-picture-large"
                            />

                            <FriendButton userId={this.props.match.params.id} />
                        </div>
                    </div>
                    <div className="column-left-top">
                        <h3>{first + " " + last}</h3>
                        <BioEditor bio={bio} canEdit={false} />
                    </div>
                </div>
            </>
        );
    }
}
