import React from "react";

import styles from "./loader.module.scss";

export const Loader: React.FC = () => (
  <div className={styles["center-both"]}>
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
);
