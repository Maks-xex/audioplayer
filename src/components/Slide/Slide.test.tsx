import React from "react";
import { render } from "@testing-library/react";
import { Slide } from "./Slide"; // Update the import path as needed

describe("Slide component", () => {
  it("renders children", () => {
    const childElement = <div>Test Child Component</div>;
    render(<Slide>{childElement}</Slide>);

    const childDiv = document.querySelector(".slider_wrapper > div");
    expect(childDiv).toHaveTextContent("Test Child Component");
  });

  it("renders with the correct class names", () => {
    render(<Slide>{<div>Test Child Component</div>}</Slide>);

    const slideElement = document.querySelector(".slider");
    const wrapperElement = document.querySelector(".slider_wrapper");

    expect(slideElement).toBeInTheDocument();
    expect(wrapperElement).toBeInTheDocument();
  });
});
