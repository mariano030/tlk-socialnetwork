import React, { useState } from "react";

// useState is the hook

function GreetPerson() {
    // setPerson function is named by convention but it's not the law
    // you do not have to assign a default value aka "ivana"
    const [person, setPerson] = useState("ivana");

    const handleChange = (e) => {
        console.log("e.target.value: ", e.target.value);
        setPerson(e.target.value);
    };

    return (
        <div>
            Hello {person}
            <input onChange={handleChange} name="name" type="text" />
        </div>
    );
}

// we used to do this:
// <input onChange={(e) => handleChange} name="name" type="text" />
// so we could bind  this, with hooks we do not need to!
