import React, { useEffect, useState } from "react";

import { AudioPlayerControls } from "../AudioPlayerControls/AudioPlayerControls";

import { IAsset } from "../../types";

import styles from "./audio-player.module.scss";
import "./slide-animation.scss";
import { Loader } from "../Loader/Loader";
import { useTransitionControl } from "../../hooks/useTransitionControl";

interface ISliderProps {
  assets: IAsset[];
  isLoading: boolean;
}

export const AudioPlayer: React.FC<ISliderProps> = ({ assets, isLoading }) => {
  const { isTransitioning, startTransition } = useTransitionControl(450);
  const [animation, setAnimation] = useState("");
  const [currentAsset, setCurrentAsset] = useState<IAsset>({
    id: 0,
    text: "",
    imageURL: "",
    audioURL: "",
  });

  const [currentStep, setCurrentStep] = useState<number>(0);
  const clickPreviousHandler = (): void => {
    if (assets.length > currentStep && currentStep !== 0) {
      if (isTransitioning) return;
      startTransition();
      setAnimation("carousel-animation slide-out-animation-previous");
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setCurrentAsset(assets[currentStep - 1]);
        setAnimation("carousel-animation slide-in-animation-previous");
      }, 300);
    }
  };
  const clickNextHandler = (): void => {
    if (assets.length - 1 > currentStep) {
      if (isTransitioning) return;
      startTransition();
      setAnimation("carousel-animation slide-out-animation-next");
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setCurrentAsset(assets[currentStep + 1]);
        setAnimation("carousel-animation slide-in-animation-next");
      }, 300);
    }
  };
  useEffect(() => {
    if (assets.length > 0) {
      setCurrentAsset(assets[currentStep]);
    }
  }, [isLoading]);

  return (
    <section className={styles.slider} data-testid="audio-player-component">
      <div className={styles.slider_wrapper}>
        <Loader isLoading={isLoading} />
        <img
          src={currentAsset.imageURL}
          className={`${styles.cover} ${animation}`}
          alt={currentAsset.text}
        />
        <h3>{currentAsset.text}</h3>
        <AudioPlayerControls
          src={currentAsset.audioURL}
          onEnded={clickNextHandler}
          clickNextHandler={clickNextHandler}
          clickPreviousHandler={clickPreviousHandler}
          canClickNext={assets.length - 1 > currentStep}
          canClickPrevious={assets.length > currentStep && currentStep !== 0}
        />
      </div>
    </section>
  );
};
