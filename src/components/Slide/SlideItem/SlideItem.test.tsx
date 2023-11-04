import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SlideItem } from "./SlideItem";

const mockData = {
  id: 1,
  imageURL: "mock-image-url",
  text: "Mock Text",
  audioURL: "mock-audio-url",
};

const mockProps = {
  data: mockData,
  clickNextHandler: jest.fn(),
  clickPreviousHandler: jest.fn(),
  length: 3,
  currentIndex: 1,
  index: 1,
  animation: {
    enterActive: "enter-active-class",
    enter: "enter-class",
    exitActive: "exit-active-class",
    exit: "exit-class",
  },
  timeout: 500,
};

describe("SlideItem Component", () => {
  it("renders the component with provided data", () => {
    const { getByLabelText, getByText, getByAltText } = render(
      <SlideItem {...mockProps} />
    );

    expect(getByAltText(mockData.text)).toBeInTheDocument();
    expect(getByText(mockData.text)).toBeInTheDocument();
    expect(getByLabelText("Audio player")).toBeInTheDocument();
  });

  it("renders with animation classes", () => {
    const { getByTestId } = render(<SlideItem {...mockProps} />);

    expect(getByTestId("slide-item")).toHaveClass("is-visible");
  });

  it("calls clickNextHandler when clicking next", () => {
    const { getByLabelText } = render(<SlideItem {...mockProps} />);

    const nextButton = getByLabelText("Skip");
    fireEvent.click(nextButton);

    expect(mockProps.clickNextHandler).toHaveBeenCalled();
  });

  it("calls clickPreviousHandler when clicking previous", () => {
    const { getByLabelText } = render(<SlideItem {...mockProps} />);

    const previousButton = getByLabelText("Previous");
    fireEvent.click(previousButton);

    expect(mockProps.clickPreviousHandler).toHaveBeenCalled();
  });

  it("renders audio player with correct attributes", () => {
    const { getByLabelText } = render(<SlideItem {...mockProps} />);

    const audioPlayer = getByLabelText("Audio player");
    expect(audioPlayer.firstChild).toHaveAttribute("src", mockData.audioURL);
    expect(audioPlayer).toHaveAttribute("aria-label", "Audio player");
  });
});
