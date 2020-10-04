import React from "react";
import ProfilePic from "./profilePic.js";
import BioEditor from "./bioEditor.js";

export default function Profile(props) {
    const { toggleUploader, first, last, imageUrl } = props; // in class elements we need to say this.props
    return (
        <>
            <div className="row">
                <div className="column-left">
                    <ProfilePic
                        toggleUploader={toggleUploader}
                        imageUrl={imageUrl}
                        myClassName="profile-picture-large"
                    />
                </div>
                <div className="column-left">
                    <h2>{first + " " + last}</h2>
                    <BioEditor />
                </div>
            </div>
        </>
    );
}
