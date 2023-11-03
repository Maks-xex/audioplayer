import React, { useState } from "react";

import { useQuery } from "react-query";

import { getSlides } from "../api/get-slides";

import { Slide } from "../components/Slide/Slide";

import { IData } from "../types";
import { SlideItem } from "../components/Slide/SlideItem/SlideItem";

import { useTransitionControl } from "../hooks/useTransitionControl";
import styles from "./slide-animation.module.scss";

export const SlideFlow: React.FC = () => {
  const { isTransitioning, startTransition } = useTransitionControl(500);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<"prev" | "next">("next");
  const [data, setData] = useState<IData[]>([]);

  const { isLoading } = useQuery<IData[]>("slides", getSlides, {
    onSuccess(data) {
      setData(data);
    },
  });
  const clickPreviousHandler = (index: number): void => {
    if (isTransitioning) {
      return;
    }
    if (data.length > currentIndex && index !== 0) {
      startTransition();
      setDirection("prev");
      setCurrentIndex(index - 1);
    }
  };
  const clickNextHandler = (index: number): void => {
    if (isTransitioning) {
      return;
    }
    if (data.length - 1 > currentIndex) {
      startTransition();
      setDirection("next");
      setCurrentIndex(index + 1);
    }
  };

  const renderSlides = (): JSX.Element => (
    <>
      {data.map((slide, i) => (
        <SlideItem
          key={slide.id}
          data={slide}
          length={data.length}
          timeout={500}
          clickNextHandler={() => clickNextHandler(i)}
          clickPreviousHandler={() => clickPreviousHandler(i)}
          currentIndex={currentIndex}
          animation={{
            enterActive: styles[`${direction}-enter-active`],
            enter: styles[`${direction}-enter`],
            exitActive: styles[`${direction}-exit-active`],
            exit: styles[`${direction}-exit`],
          }}
          onEnded={() => clickNextHandler(i)}
          index={i}
        />
      ))}
    </>
  );
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <Slide>{renderSlides()}</Slide>}
    </>
  );
};
