import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { FaPlay, FaHome } from "react-icons/fa";
import logo from "../../English Club Logo.png";

function Header({ isLandingPage }) {
  const navigate = useNavigate();

  return (
    <div className={styles["header-container"]}>
      <div className={styles["logo-container"]} onClick={() => navigate("/")}>
        <img src={logo} alt="English Cards Logo" className={styles.logo} />
      </div>
      <div className={styles["btn-container"]}>
        {isLandingPage ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className={styles["login-button"]}
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className={styles["signup-button"]}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/")}
              className={styles["home-button"]}
            >
              <FaHome style={{ fontSize: "2.5rem" }} />
            </button>
            <button
              onClick={() => navigate("/game")}
              className={styles["play-button"]}
            >
              <FaPlay style={{ fontSize: "2.5rem" }} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
