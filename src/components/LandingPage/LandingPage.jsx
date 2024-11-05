// src/components/LandingPage/LandingPage.js
import React from "react";
import Header from "../Header/Header";
import "./landingpage.module.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <Header isLandingPage={true} />
      <div className="content">
        <h1>Welcome to English Cards</h1>
        <p>Start learning new words in a fun and interactive way.</p>
      </div>
    </div>
  );
}

export default LandingPage;
