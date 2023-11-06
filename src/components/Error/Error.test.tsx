import React from "react";
import { render } from "@testing-library/react";

import { Error as ErrorComponent } from "./Error";

describe("Error", () => {
  it("displays an error message", () => {
    const errorMessage = "An error occurred.";
    const { getByTestId, getByText } = render(
      <ErrorComponent error={new Error(errorMessage)} />
    );

    const errorComponent = getByTestId("error");
    const errorTitle = getByText("Oops! Something went wrong");
    const errorDescription = getByText(errorMessage);

    expect(errorComponent).toBeInTheDocument();
    expect(errorTitle).toBeInTheDocument();
    expect(errorDescription).toBeInTheDocument();
  });

  it("handles an undefined error prop", () => {
    const { queryByTestId } = render(<ErrorComponent error={undefined} />);

    const errorComponent = queryByTestId("error");

    expect(errorComponent).toBeNull();
  });

  it("displays an empty error message when error message is empty", () => {
    const { getByTestId, getByText } = render(
      <ErrorComponent error={new Error("")} />
    );

    const errorComponent = getByTestId("error");
    const errorTitle = getByText("Oops! Something went wrong");
    const errorDescription = getByTestId("error-message");

    expect(errorComponent).toBeInTheDocument();
    expect(errorTitle).toBeInTheDocument();
    expect(errorDescription).toBeInTheDocument();
  });
});
