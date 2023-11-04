import React from "react";
import { render } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader Component", () => {
  it("renders the loader component", () => {
    const { queryByTestId } = render(<Loader />);

    const loaderElement = queryByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
  });
});
