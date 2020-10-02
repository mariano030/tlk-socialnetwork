import React from "react";

import Greetee from "./greetee.js";

import Counter from "./counter.js";

// component "HelloWorld"
// 2 types of component - functional components & class components
export default function HelloWorld() {
    const name = "Pete";
    // css object -
    const myStyles = {
        color: "tomato",
        fontFamily: "Impact",
        fontSize: "30px",
    };
    return (
        <div>
            <div className="my-class" mystlye="{ myStyles}">
                Hello, <Greetee />
            </div>
            <h1> What the? 2 +2 ? {2 + 2}</h1>
            <Counter />
            <Changer />
        </div>
    );
}
