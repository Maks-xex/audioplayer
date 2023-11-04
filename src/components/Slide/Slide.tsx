import React from "react";

import styles from "./slide.module.scss";

interface ISlide {
  children: JSX.Element;
}
export const Slide: React.FC<ISlide> = ({ children }) => {
  return (
    <section className={styles.slider} data-testid="slide">
      <div className={styles.slider_wrapper}>{children}</div>
    </section>
  );
};
