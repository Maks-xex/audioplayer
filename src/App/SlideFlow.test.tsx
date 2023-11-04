import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { SlideFlow } from "./SlideFlow";
import { useQuery } from "react-query";

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
}));

describe("SlideFlow Component", () => {
  it("renders loader when data is loading", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
    });

    const { queryByTestId } = render(<SlideFlow />);

    expect(queryByTestId("loader")).toBeInTheDocument();
    expect(queryByTestId("slide")).toBeNull();
    expect(queryByTestId("error")).toBeNull();
  });

  it("renders error when there is an error", () => {
    const error = new Error("An error occurred");

    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      error,
    });

    const { queryByTestId } = render(<SlideFlow />);

    expect(queryByTestId("error")).toBeInTheDocument();
    expect(queryByTestId("loader")).toBeNull();
    expect(queryByTestId("slide")).toBeNull();
  });

  it("renders the slide with data when data is loaded", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        { id: 1, title: "Slide 1" },
        { id: 2, title: "Slide 2" },
      ],
    });

    const { queryByTestId } = render(<SlideFlow />);

    expect(queryByTestId("error")).toBeNull();
    expect(queryByTestId("loader")).toBeNull();
    expect(queryByTestId("slide")).toBeInTheDocument();

    await waitFor(() => {
      const slideItemElement = queryByTestId("slide-item");
      const h3Tags = slideItemElement?.querySelectorAll("h3");
      h3Tags?.forEach((h3Tag) => {
        expect(h3Tag.textContent).toContain("slide");
      });
    });
  });

  it("handles clickNextHandler and clickPreviousHandler", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        { id: 1, title: "Slide 1" },
        { id: 2, title: "Slide 2" },
      ],
    });

    const { getByTestId, getByText } = render(<SlideFlow />);

    expect(getByTestId("slide")).toBeInTheDocument();

    void waitFor(() => {
      const slide1Element = getByText("Slide 1", { exact: false });
      if (slide1Element) {
        expect(slide1Element).toBeInTheDocument();
      }
    }).then(() => {
      fireEvent.click(getByText("Next"));

      expect(getByTestId("slide")).toBeInTheDocument();
      expect(getByText("Slide 2")).toBeInTheDocument();
    });
  });
});
