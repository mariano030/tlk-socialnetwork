import React from "react";
import ProfilePic from "./profilePic.js";
import BioEditor from "./bioEditor.js";

export default function Profile(props) {
    const { toggleUploader, updateState, first, last, imageUrl, bio } = props; // in class elements we need to say this.props
    return (
        <>
            <div className="row">
                <div className="column-left">
                    <ProfilePic
                        toggleUploader={toggleUploader}
                        updateState={updateState}
                        imageUrl={imageUrl}
                        myClassName="profile-picture-large"
                    />
                </div>
                <div className="column-left-top">
                    <h3>{first + " " + last}</h3>
                    <BioEditor bio={bio} updateState={updateState} />
                </div>
            </div>
        </>
    );
}
