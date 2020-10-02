import React from "react";
import ProfilePic from "./profile.js";
import BioEditor from "./bioEditor.js";

export default function Profile(props) {
    const { first, last, imageUrl } = props; // in class elements we need to say this.props
    return (
        <>
            <div>I am the Profile Component</div>
            <ProfilePic
                imageUrl={imageUrl}
                myClassName="profile-picture-large"
            />
            <BioEditor />
        </>
    );
}
