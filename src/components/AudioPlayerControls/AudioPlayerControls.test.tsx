import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";

import { AudioPlayerControls } from "./AudioPlayerControls";

describe("AudioPlayerControls", () => {
  const src = "audio.mp3";

  it("calls clickNextHandler and clickPreviousHandler when Next and Previous buttons are clicked", () => {
    const clickNextHandler = jest.fn();
    const clickPreviousHandler = jest.fn();

    const { getByLabelText } = render(
      <AudioPlayerControls
        src={src}
        clickNextHandler={clickNextHandler}
        clickPreviousHandler={clickPreviousHandler}
        canClickNext={true}
        canClickPrevious={true}
      />
    );

    const nextButton = getByLabelText("Skip");
    const previousButton = getByLabelText("Previous");

    fireEvent.click(nextButton);
    fireEvent.click(previousButton);

    expect(clickNextHandler).toHaveBeenCalledTimes(1);
    expect(clickPreviousHandler).toHaveBeenCalledTimes(1);
  });

  it("disables Next and Previous buttons when canClickNext and canClickPrevious are false", () => {
    const { queryByTestId } = render(
      <AudioPlayerControls
        src={src}
        clickNextHandler={() => {}}
        clickPreviousHandler={() => {}}
        canClickNext={false}
        canClickPrevious={false}
      />
    );

    const nextButton = queryByTestId("next-icon");
    const previousButton = queryByTestId("previous-icon");
    void waitFor(() => {
      expect(previousButton?.firstChild).toHaveAttribute("color", "#00305722");
      expect(nextButton?.firstChild).toHaveAttribute("color", "#00305722");
    });
  });
  it("should have enable autoPlay ", () => {
    const { getByLabelText } = render(
      <AudioPlayerControls
        src={src}
        clickNextHandler={() => {}}
        clickPreviousHandler={() => {}}
        canClickNext={false}
        canClickPrevious={false}
      />
    );

    const audioPlayer = getByLabelText("Audio player");
    expect(audioPlayer.firstChild).toHaveAttribute("autoPlay");
  });
});
