import React from "react";

export default function Example({ first, last, imageUrl }) {
    //console.log("prop", props);
    return (
        <>
            <h2>
                {" "}
                Hey I am the example, welcome {first} {last}
            </h2>
            <img
                src={imageUrl || "./img/user_avatar_default"}
                alt={first + " " + last}
            />
        </>
    );
}

// if you call a method in the render you will have to bind it first
// can not read property .setState of undefined
// cannot read ... of undefinde -> you have not bound it!
