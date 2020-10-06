import React from "react";

import BioEditor from "./bioEditor.js";

import { render, fireEvent, waitForElement } from "@testing-library/react";

import Axios from "./axios.js";

jest.mock("./axios.js");

axios.get.mockResolvedValue({
    data: {
        id: 1,
    },
});

test("When no bio is passed to it, an 'Add' button is rendered.", () => {
    const { container } = render(<BioEditor canEdit={true} />);
    expect(container.querySelector("div.button").innerHTML).toContain(
        "Add Bio"
    );
});

test("When A BIO IS passed to it, an 'Edit Bio' button is rendered.", () => {
    const { container } = render(<BioEditor canEdit={true} bio="test" />);
    //console.log("elem", container.querySelectorAll("div.button"));

    //console.log("innerH", container.querySelectorAll("div.button"));
    expect(container.querySelector("div.button").innerHTML).toContain(
        "Edit Bio"
    );
    // expect(container.querySelectorAll("div.button")).toContain([
    //     <div class="button">Add Bio</div>,
    // ]);
});

test("when Add or Edit is clicked a TEXTAREA & Save Button are renderd", () => {
    const mockOnClick = jest.fn(() => console.log("Clicked!!!")); // would work without function inside
    const { container } = render(
        <BioEditor canEdit={true} onClick={mockOnClick} />
    );
    // now test the click!!
    fireEvent.click(container.querySelector("div.button")); // pass dom node i want to click on!
    // fireEvent.click(container.querySelector("img"));  - use same code again for 2nd, 3rd click!
    expect(
        container.querySelector("textarea + div.button").innerHTML
    ).toContain("Save"); // expect fn to be called ONCE
    //expect(container.querySelector("div.button")).toContain("Save");
});

//  BioEditor from “../src/loggedin/bioEditor”;


test("after axios function that was passed is called", async () => {
    const { container } = render(<App updateState=(()=> console.log("i'm running!"))/>);
    console.log(
        "lets look at the html that is rendered: ",
        container.innerHTML
    );
    await waitForElement(() => container.querySelector("div"));
    console.log("after waiting the html is: ", container.innerHTML);
    expect(container.querySelector("div").children.length).toBe(1);
});