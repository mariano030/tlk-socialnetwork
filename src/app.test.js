import React from "react";

import App from "./app.js";
import { render, waitForElement } from "@testing-library/react";
import Axios from "./axios";

// automatic mock - mocks axios with a mock of all of axios' methods mocked aswell
// create fake version of axios that doesn not acutally do anything
// even though this axios is mocked it is STILL asynchronous!
jest.mock(".axios");

//set return value of mocked method
Axios.get.mockResolvedValue({
    data: {
        first: "marian",
        last: "heidbreder",
        userId: 3,
    },
});
// how to tell our test to chill before evaluation something (e.g. axios happening inbetween)

// have to make this an asynchronous fn so we can use await waitForElement()
test("app eventully shows a div", async () => {
    const { container } = render(<App />); // would actually call componentDidMount (and thus an axios request)
    console.log(
        "let's look at the html that is rendereed: ",
        container.innerHTML
    ); //nothing rendered yet!
    // test is waiting for something to show up on screen
    await waitForElement(() => container.querySelector("div"));
    console.log(
        "let's look at the html that is rendereed (after): ",
        container.innerHTML
    );
    expect(querySelector("div").children.length).toBe(1);
});
