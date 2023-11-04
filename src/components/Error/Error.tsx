import React from "react";
import styles from "./error.module.scss";

interface IErrorProps {
  error?: Error | null;
}
export const Error: React.FC<IErrorProps> = ({ error }) => {
  const renderError = (): JSX.Element => {
    if (error && /^[0-9]*$/.test(error?.message)) {
      return (
        <>
          <h1 style={{ marginBottom: "0" }}>
            {error?.message.split("").map((number, i) => (
              <span key={i} data-testid="error-digit">
                {number}
              </span>
            ))}
          </h1>
          {error.message === "503" && (
            <h2>
              We apologize for the inconvenience. Our team is actively working
              to resolve the issue.
            </h2>
          )}
        </>
      );
    } else {
      return <h2>{error?.message}</h2>;
    }
  };

  return (
    <div className={styles.notfound__wrapper} data-testid="error">
      <div className={styles.notfound}>
        <div className={styles["notfound-404"]}>
          <h3>Oops! Something went wrong</h3>
          {renderError()}
        </div>
      </div>
    </div>
  );
};
