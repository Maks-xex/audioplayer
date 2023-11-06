import React from "react";
import { useQuery } from "react-query";
import { render, waitFor } from "@testing-library/react";

import { App } from "./App";

jest.mock("react-query", () => ({
  useQuery: jest.fn(),
}));

describe("App Component", () => {
  it("renders loader when data is loading", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
    });

    const { queryByTestId } = render(<App />);

    expect(queryByTestId("loader")).toBeInTheDocument();
    expect(queryByTestId("error")).toBeNull();
  });
  it("renders error when there is an error", () => {
    const error = new Error("An error occurred");

    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      error,
    });

    const { queryByTestId } = render(<App />);

    expect(queryByTestId("error")).toBeInTheDocument();
    expect(queryByTestId("loader")).toBeNull();
  });
  it("renders the slide with data when data is loaded", async () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        { id: 1, text: "Slide 1" },
        { id: 2, text: "Slide 2" },
      ],
    });

    const { queryByTestId } = render(<App />);

    expect(queryByTestId("error")).toBeNull();
    expect(queryByTestId("loader")).toBeNull();

    await waitFor(() => {
      const audioPlayerComponent = queryByTestId("audio-player-component");
      expect(audioPlayerComponent).toBeInTheDocument();
    });
  });
});
