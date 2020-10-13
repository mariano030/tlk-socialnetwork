import React from "react";

export default function ProfilePic({
    toggleUploader,
    first,
    last,
    imageUrl,
    myClassName,
    myBorderClassName,
}) {
    return (
        <>
            <div className={myBorderClassName || "profile-border"}>
                <img
                    src={imageUrl || "/img/default_avatar.png"}
                    alt={"Profile picture" + first + " " + last}
                    className={myClassName || "profile-picture"}
                    onClick={toggleUploader}
                />
            </div>
        </>
    );
}

// if you call a method in the render you will have to bind it first
// IF can not read property .setState of undefined
// cannot read ... of undefinde -> you have not bound it!
