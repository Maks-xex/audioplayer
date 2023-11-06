import React from "react";
import { render } from "@testing-library/react";

import { Loader } from "./Loader";

describe("Loader", () => {
  it("should show loader", () => {
    const { getByTestId } = render(<Loader isLoading={true} />);
    expect(getByTestId("loader")).toBeInTheDocument();
  });
  it("should show nothing", () => {
    const { queryByTestId } = render(<Loader isLoading={false} />);
    expect(queryByTestId("loader")).toBeNull();
  });
});
