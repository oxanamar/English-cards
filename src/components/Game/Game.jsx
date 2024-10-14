import React, { useState } from "react";
import data from "../../data";
import styles from "./game.module.css";

function Game() {
  // Tracks the current card index
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // Toggles the Russian translation
  const [showRussian, setShowRussian] = useState(false);
  // Get the current card from the data
  const currentCard = data[currentCardIndex];

  // Go to the next card
  const nextCard = () => {
    if (currentCardIndex < data.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      // Hide the Russian translation when going to the next card
      setShowRussian(false);
    }
  };

  // Go to the previous card
  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      // Hide the Russian translation when going to the previous card
      setShowRussian(false);
    }
  };

  return (
    <div className={styles["game-container"]}>
      <div className={styles["card-navigation"]}>
        <div className={styles["navigation"]}>
          <button
            className={styles["btn-nav"]}
            onClick={prevCard}
            disabled={currentCardIndex === 0}
          >
            &lt; {/* Left Arrow */}
          </button>

          <div className={styles.card}>
            <h2>{currentCard.english}</h2>
            <p>{currentCard.transcription}</p>

            {showRussian ? (
              // Clicking on the word will bring the button back
              <p
                className={styles.russian}
                onClick={() => setShowRussian(false)}
              >
                {currentCard.russian}
              </p>
            ) : (
              // Clicking on "Check" shows the word
              <button
                className={styles["btn-check"]}
                onClick={() => setShowRussian(true)}
              >
                Check
              </button>
            )}
          </div>

          <button
            className={styles["btn-nav"]}
            onClick={nextCard}
            disabled={currentCardIndex === data.length - 1}
          >
            &gt; {/* Right Arrow */}
          </button>
        </div>
      </div>

      <p>
        You've learned {currentCardIndex + 1} out of {data.length} words!
      </p>
    </div>
  );
}

export default Game;
