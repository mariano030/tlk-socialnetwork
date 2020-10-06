import React from "react";

import BioEditor from "./../bioEditor.js";

import { render } from "@testing-library/react";

test("When no bio is passed to it, an 'Add' button is rendered.", () => {
    const { container } = render(<BioEditor />);
    expect(container.querySelectorAll(".button").innerHTML).toBe("Add");
});
