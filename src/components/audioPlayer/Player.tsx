import React from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";

import { Icon } from "@iconify/react";

import "./audio-player.scss";

interface IPlayer {
  src: string;
  clickNextHandler: () => void;
  clickPreviousHandler: () => void;
  onEnded?: (() => void) | undefined;
  canClickNext: boolean;
  canClickPrevious: boolean;
  className?: string;
}
const disabledColor = "#00305722";

export const Player: React.FC<IPlayer> = ({
  src,
  clickNextHandler,
  clickPreviousHandler,
  canClickNext,
  canClickPrevious,
  onEnded,
}) => {
  const customIcons = {
    previous: (
      <Icon
        data-testid="previous-icon"
        icon="mdi:skip-previous"
        color={canClickPrevious ? "" : disabledColor}
      />
    ),
    next: (
      <Icon
        data-testid="next-icon"
        icon="mdi:skip-next"
        color={canClickNext ? "" : disabledColor}
      />
    ),
  };

  return (
    <AudioPlayer
      onEnded={onEnded}
      volume={0.04}
      autoPlay
      showSkipControls
      src={src}
      onClickNext={clickNextHandler}
      onClickPrevious={clickPreviousHandler}
      showJumpControls={false}
      customAdditionalControls={[]}
      customIcons={customIcons}
    />
  );
};
