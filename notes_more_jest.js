// jest by itself, no react
// jest is a testing library

// tells you howmany times called, what was passed, what did it return
//

// mockfunction will return an object with all the info,
// that's why we store it in a variable

const myMockFn = jest.fn(/*this ist the function I am spying on*/);

const a = [10, 20, 55];

a.map(myMockFn);
// .map is an array method - for looping
// for each item in arry it is going to run the fn() it was handed
// map alwasys returns an array!

console.log(myMockFn.mock.calls.length); // == 3

// testing often used in INTERVIEWS !
// oftentimes you get an exercise (fun) and a test - that needs to be passed

// calls is an array of arrays, one for each call
// keyword here is calls
myMockFn.mock.calls = [
    [10, 0, a], // each one of those arrays represents one invocation (call) of the fn()
    [], // storing all arg passed
    [],
];

// calls[0] ist giving
expect(myMockFn.mock.calls[1]).toEqual([]);

expect(myMockFn.mock.results[1].value).toBe(20);
import { render } from "@testing-library/react";
//results.value gives you the element returned by fn
// keyword here is results!
//expect.().toEqual() is for arrays & objects (deep comparison), .toBe is for primitives

/// TESTS ON REACT  -- REACT TESTING LIBRARY
// React Testing Library
// used in conjunciton with jest - translates jest to react, basically
// acutally renders
// (enzyme is biggest competitor to react testing library)


// ProfilePic Component
import React from "react";

const ProfilePic = ({first, last, url = "/default.jpg", onClick}) => (
    <img src={url} alt {`${first} ${last}`} onClick={onClick} />
)

export default ProfilePic
///


render() {
    if (!id) {
        return null;

    }
    return (
        <>
            <ProfilePic />
        </>
    )
}