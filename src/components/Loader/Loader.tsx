import React from "react";

import styles from "./loader.module.scss";

interface ILoaderProps {
  isLoading: boolean;
}

export const Loader: React.FC<ILoaderProps> = ({ isLoading }) =>
  isLoading ? (
    <div className={styles["center-both"]} data-testid="loader">
      <div className={styles["lds-roller"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  ) : null;
