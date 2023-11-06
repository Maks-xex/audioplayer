import { useState, useEffect } from "react";

interface ITransitionControl {
  endTransition: () => unknown;
  isTransitioning: boolean;
  startTransition: () => void;
}

export const useTransitionControl = (
  transitionDuration: number = 500
): ITransitionControl => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const startTransition = (): void => {
    setIsTransitioning(true);
  };

  const endTransition = (): void => {
    setIsTransitioning(false);
  };

  useEffect(() => {
    let transitionTimer: string | number | NodeJS.Timeout | undefined;

    if (isTransitioning) {
      transitionTimer = setTimeout(endTransition, transitionDuration);
    }

    return () => {
      if (transitionTimer) {
        clearTimeout(transitionTimer);
      }
    };
  }, [isTransitioning, transitionDuration]);

  return {
    isTransitioning,
    startTransition,
    endTransition,
  };
};
