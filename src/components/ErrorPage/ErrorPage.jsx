import React from "react";
import styles from "./errorpage.module.css";

function ErrorPage() {
  return (
    <div className={styles.errorPage}>
      <h2>404 Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}

export default ErrorPage;
