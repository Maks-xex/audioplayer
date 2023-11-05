import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AudioPlayer } from "./AudioPlayer";
// mockAudioPlayer.js

const mockPlay = jest.fn();

const mockHTMLMediaElement = {
  play: mockPlay,
};
jest.spyOn(mockHTMLMediaElement, "play").mockImplementation(mockPlay);

const assets = [
  {
    id: 1,
    text: "Sample Text 1",
    imageURL: "sample-image-1.jpg",
    audioURL: "sample-audio-1.mp3",
  },
  {
    id: 2,
    text: "Sample Text 2",
    imageURL: "sample-image-2.jpg",
    audioURL: "sample-audio-2.mp3",
  },
];
describe("AudioPlayer Component", () => {
  it("renders without errors", () => {
    render(<AudioPlayer assets={assets} isLoading={false} />);
  });

  it("displays the current asset", () => {
    render(<AudioPlayer assets={assets} isLoading={false} />);
    const currentAsset = assets[0];
    const assetImage = screen.getByAltText(currentAsset.text);

    expect(assetImage).toBeInTheDocument();
  });

  it("allows clicking next and previous", async () => {
    const { getByLabelText, queryByText } = render(
      <AudioPlayer assets={assets} isLoading={false} />
    );
    const nextButton = getByLabelText("Skip");
    const previousButton = getByLabelText("Previous");

    fireEvent.click(nextButton);
    jest.spyOn(mockHTMLMediaElement, "play").mockImplementation(mockPlay);
    await waitFor(() => {
      const nextStepElement = queryByText(assets[1].text);
      expect(nextStepElement).toBeInTheDocument();
    });

    await waitFor(() => {
      fireEvent.click(previousButton);
      jest.spyOn(mockHTMLMediaElement, "play").mockImplementation(mockPlay);
      const prevStepElement = queryByText(assets[0].text);
      expect(prevStepElement).toBeInTheDocument();
    });
  });

  it("handles loading state correctly", () => {
    render(<AudioPlayer assets={assets} isLoading={true} />);
    const loader = screen.getByTestId("loader");

    expect(loader).toBeInTheDocument();
  });
});
