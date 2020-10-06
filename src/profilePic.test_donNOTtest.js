import React from "react";
import ProfilePic from "./profilePic.js";
import { render, fireEvent } from "@testing-library/react"; // fireEvent is for testing events

test("description - when no url is passed, /default.jsp is used as src", () => {
    const { container } = render(<ProfilePic />); // must be called container - it's the testing equivalent to document
    console.log(container.querySelector("img"));
    expect(container.querySelector("img").src.endsWith("/default.jpg")).toBe(
        true
    );
}); // this funciton comes from jest

test("When a url is passed, that url is used as src", () => {
    const { container } = render(<ProfilePic url="/anything.jpg" />);
    expect(container.querySelector("img").src.endsWith("/anything.jpg")).toBe(
        true
    );
});
// start test with "npm test"

test("first and last name in props get put in alt attribute", () => {
    const { container } = render(<ProfilePic first="ivana" last="matijevic" />);
    expect(container.querySelector("img").getAttribute("alt")).toBe(
        "ivana matijevic"
    ); // rist prop space last prop - space is in component so space here too
});

// events in test!
test("onClick prop runs when the img is clicked", () => {
    const mockOnClick = jest.fn(() => console.log("Clicked!!!")); // would work without function inside
    const { container } = render(<ProliePic onClick={mockOnClick} />);
    // now test the click!!
    fireEvent.click(container.querySelector("img")); // pass dom node i want to click on!
    // fireEvent.click(container.querySelector("img"));  - use same code again for 2nd, 3rd click!
    expect(mockOnclick.mock.calls.length).toBe(1); // expect fn to be called ONCE
});

// don't forget to test the tests - give it jibberish and see it fail
