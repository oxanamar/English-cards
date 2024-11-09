// Loader.jsx
import React from "react";
import styles from "./loader.module.css";

function Loader() {
  return (
    <div className={styles["loader-container"]}>
      <div className={styles.loader}></div>{" "}
      {/* Adjust this line if you use an image or SVG */}
    </div>
  );
}

export default Loader;
