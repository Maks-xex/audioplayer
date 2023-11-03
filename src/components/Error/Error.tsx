import React from "react";
import styles from "./error.module.scss";

interface IErrorProps {
  error?: Error | null;
}
export const Error: React.FC<IErrorProps> = ({ error }) => {
  console.log(error);
  return (
    <div className={styles.notfound__wrapper}>
      <div className={styles.notfound}>
        <div className={styles["notfound-404"]}>
          <h3>Oops! Something went wrong</h3>
          <h1>
            {error?.message.split("").map((number) => (
              <>
                <span>{number}</span>
              </>
            ))}
          </h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
      </div>
    </div>
  );
};
