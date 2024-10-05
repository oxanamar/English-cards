import React from "react";
import styles from "./header.module.css";
import { FaPlay, FaHome } from "react-icons/fa";

function Header({ onPlay, onHome, isPlaying }) {
  return (
    <div className={styles["header-container"]}>
      <h1>English Cards</h1>
      <div>
        {isPlaying ? (
          <button onClick={onHome} className={styles["home-button"]}>
            <FaHome style={{ fontSize: "2.5rem" }} />
          </button>
        ) : (
          <button onClick={onPlay} className={styles["play-button"]}>
            <FaPlay style={{ fontSize: "2.5rem" }} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
