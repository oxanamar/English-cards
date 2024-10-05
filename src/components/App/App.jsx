import React, { useState } from "react";
import Header from "../Header/Header";
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import Game from "../Game/Game";
import "./App.css";

function App() {
  // Toggle between home and game view
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to start the game
  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Function to go back to the home page
  const handleHome = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      {/* The Header and Footer are always rendered */}
      <Header onPlay={handlePlay} onHome={handleHome} isPlaying={isPlaying} />
      {/* Conditional rendering for the main content (home or game) */}
      {isPlaying ? <Game /> : <Table />}
      <Footer />
    </div>
  );
}

export default App;
