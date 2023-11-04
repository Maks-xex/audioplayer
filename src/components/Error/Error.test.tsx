import React from "react";
import { render, screen } from "@testing-library/react";
import { Error as ErrorComponent } from "./Error";

describe("Error Component", () => {
  it("renders an error message when provided with an error object", () => {
    const errorMessage = "Test error message";
    const error = new Error(errorMessage);

    render(<ErrorComponent error={error} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it("renders a special message for HTTP 503 error", () => {
    const http503Error = new Error("503");

    render(<ErrorComponent error={http503Error} />);

    const specialMessage = screen.getByText(
      "We apologize for the inconvenience. Our team is actively working to resolve the issue."
    );
    expect(specialMessage).toBeInTheDocument();
  });

  it("renders individual digits when provided a numeric error message", () => {
    const numericErrorMessage = "404";
    const error = new Error(numericErrorMessage);

    render(<ErrorComponent error={error} />);

    const digitElements = screen.getAllByTestId("error-digit");
    expect(digitElements).toHaveLength(numericErrorMessage.length);

    digitElements.forEach((digitElement, index) => {
      expect(digitElement).toHaveTextContent(numericErrorMessage[index]);
    });
  });
});
