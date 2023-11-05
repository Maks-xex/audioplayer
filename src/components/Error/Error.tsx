import React from "react";
import styles from "./error.module.scss";

interface IErrorProps {
  error?: Error;
}
export const Error: React.FC<IErrorProps> = ({ error }) => {
  if (!error) return null;
  return (
    <div className={styles.notfound__wrapper} data-testid="error">
      <div className={styles.notfound}>
        <div className={styles["notfound-404"]}>
          <h3>Oops! Something went wrong</h3>
          <p data-testid="error-message">{error?.message ?? ""}</p>
        </div>
      </div>
    </div>
  );
};
