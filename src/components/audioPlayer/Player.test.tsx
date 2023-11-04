import React from "react";
import { RenderResult, render, waitFor } from "@testing-library/react";
import { Player } from "./Player";

const mockClickNextHandler = jest.fn();
const mockClickPreviousHandler = jest.fn();

function renderPlayer({
  src = "mock-audio-source.mp3",
  clickNextHandler = mockClickNextHandler,
  clickPreviousHandler = mockClickPreviousHandler,
  onEnded = mockClickNextHandler,
  canClickNext = true,
  canClickPrevious = true,
} = {}): RenderResult {
  return render(
    <Player
      src={src}
      clickNextHandler={clickNextHandler}
      clickPreviousHandler={clickPreviousHandler}
      onEnded={onEnded}
      canClickNext={canClickNext}
      canClickPrevious={canClickPrevious}
    />
  );
}

describe("Player Component", () => {
  it("renders the audio player with custom controls", () => {
    const { getByLabelText, getByTestId } = renderPlayer();

    const audioPlayerElement = getByLabelText("Audio player");
    expect(audioPlayerElement).toBeInTheDocument();

    const skipControls = getByLabelText("Skip");
    expect(skipControls).toBeInTheDocument();
    const previouControls = getByLabelText("Previous");
    expect(previouControls).toBeInTheDocument();

    void waitFor(() => expect(getByTestId("next-icon")).toBeInTheDocument());
    void waitFor(() =>
      expect(getByTestId("previous-icon")).toBeInTheDocument()
    );

    getByLabelText("Skip").click();
    getByLabelText("Previous").click();

    expect(mockClickNextHandler).toHaveBeenCalledTimes(1);
    expect(mockClickPreviousHandler).toHaveBeenCalledTimes(1);
  });
  it("should have custom icons with correct colors and enable autoPlay ", () => {
    const { getByTestId } = renderPlayer();

    void waitFor(() =>
      expect(getByTestId("previous-icon")).toHaveStyle("color: ''")
    );
    void waitFor(() =>
      expect(getByTestId("next-icon")).toHaveStyle("color: ''")
    );
  });
  it("should have enable autoPlay ", () => {
    const { getByLabelText } = renderPlayer();

    const audioPlayer = getByLabelText("Audio player");
    expect(audioPlayer.firstChild).toHaveAttribute("autoPlay");
  });
});
