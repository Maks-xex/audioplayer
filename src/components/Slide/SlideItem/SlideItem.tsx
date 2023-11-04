import React, { useRef } from "react";

import { CSSTransition } from "react-transition-group";

import { Player } from "../../Player/Player";

import { IData } from "../../../types";

import styles from "./slide-item.module.scss";

interface ISlideItem {
  data: IData;
  clickNextHandler: () => void;
  clickPreviousHandler: () => void;
  onEnded?: (() => void) | undefined;
  length: number;
  currentIndex: number;
  index: number;
  animation: {
    enterActive: string;
    enter: string;
    exitActive: string;
    exit: string;
  };
  timeout: number;
}

export const SlideItem: React.FC<ISlideItem> = ({
  data,
  clickNextHandler,
  onEnded,
  clickPreviousHandler,
  length,
  currentIndex,
  index,
  animation,
  timeout,
}) => {
  const transitionRef = useRef(null);

  return (
    <CSSTransition
      in={currentIndex === index}
      nodeRef={transitionRef}
      timeout={timeout}
      unmountOnExit
      classNames={animation}
      data-testid="slide-item"
    >
      <div
        className={
          index === currentIndex ? styles["is-visible"] : styles["v-hidden"]
        }
        ref={transitionRef}
      >
        <img src={data.imageURL} className={styles.cover} alt={data.text} />

        <h3>{data.text}</h3>
        <Player
          src={data.audioURL}
          clickNextHandler={() => clickNextHandler()}
          onEnded={onEnded ? () => onEnded() : undefined}
          clickPreviousHandler={() => clickPreviousHandler()}
          canClickNext={currentIndex < length - 1}
          canClickPrevious={currentIndex !== 0}
        />
      </div>
    </CSSTransition>
  );
};
