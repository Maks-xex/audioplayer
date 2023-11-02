import React, { useRef, useState } from "react";

import { CSSTransition } from "react-transition-group";

import { IData } from "../../types";

import styles from "./slide.module.scss";
import { Player } from "../audioPlayer/AudioPlayer";
import { useTransitionControl } from "../../hooks/useTransitionControl";

interface ISlide {
  content: IData[];
}
export const Slide: React.FC<ISlide> = ({ content }) => {
  const { isTransitioning, startTransition } = useTransitionControl(500);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const transitionRef = useRef(null);

  const handleImageClick = (index: number): void => {
    if (isTransitioning) {
      return;
    }
    if (index > currentIndex) {
      setDirection("right");
    } else {
      setDirection("left");
    }
    startTransition();
    setCurrentIndex(index);
  };

  return (
    <section className={styles.slider}>
      <div className={styles.slider_wrapper}>
        {content.map((data, i) => (
          <CSSTransition
            key={data.id}
            in={currentIndex === i}
            nodeRef={transitionRef}
            timeout={300}
            unmountOnExit
            classNames={{
              enterActive: styles[`fade_enter_active_${direction}`],
              enter: styles[`fade_enter_${direction}`],
              exitActive: styles[`fade_exit_active_${direction}`],
              exit: styles[`fade_exit_${direction}`],
            }}
          >
            <div
              className={
                i === currentIndex ? styles["is-visible"] : styles.slide
              }
              ref={transitionRef}
            >
              <img
                src={data.imageURL}
                className={styles.cover}
                alt={data.text}
              />

              <h3>{data.text}</h3>
              <Player
                src={data.audioURL}
                clickNextHandler={() =>
                  currentIndex < content.length - 1 &&
                  handleImageClick(currentIndex + 1)
                }
                onEnded={() =>
                  currentIndex < content.length - 1 &&
                  handleImageClick(currentIndex + 1)
                }
                clickPreviousHandler={() =>
                  currentIndex !== 0 && handleImageClick(currentIndex - 1)
                }
                canClickNext={currentIndex < content.length - 1}
                canClickPrevious={currentIndex !== 0}
              />
            </div>
          </CSSTransition>
        ))}
      </div>
    </section>
  );
};
