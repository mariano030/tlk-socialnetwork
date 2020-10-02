import React from "react";

export default function ProfilePic({
    toggleUploader,
    first,
    last,
    imageUrl,
    myClassName,
}) {
    return (
        <>
            <img
                src={imageUrl || "./img/default_avatar.jpg"}
                alt={first + " " + last}
                className={myClassName}
                onClick={toggleUploader}
            />
        </>
    );
}

// if you call a method in the render you will have to bind it first
// IF can not read property .setState of undefined
// cannot read ... of undefinde -> you have not bound it!
