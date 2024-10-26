import React, { useState } from "react";
import data from "../../data";
import styles from "./game.module.css";

function Game() {
  // Tracks the current card index
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // Toggles the Russian translation
  const [showRussian, setShowRussian] = useState(false);
  // Stores the IDs of learned words
  const [learnedWords, setLearnedWords] = useState(new Set());

  const currentCard = data[currentCardIndex];

  // Function to mark a word as learned when "Check" is clicked
  const handleCheck = () => {
    setShowRussian(true);

    // Add the current word to the set of learned words (avoiding duplicates)
    setLearnedWords((prevLearnedWords) => {
      const updatedSet = new Set(prevLearnedWords);
      updatedSet.add(currentCardIndex); // Track word by its index
      return updatedSet;
    });
  };

  // Go to the next card
  const nextCard = () => {
    if (currentCardIndex < data.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowRussian(false); // Hide Russian translation for new card
    }
  };

  // Go to the previous card
  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowRussian(false); // Hide Russian translation for new card
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
              <p
                className={styles.russian}
                onClick={() => setShowRussian(false)}
              >
                {currentCard.russian}
              </p>
            ) : (
              <button className={styles["btn-check"]} onClick={handleCheck}>
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
        You've learned {learnedWords.size} out of {data.length} words!
      </p>
    </div>
  );
}

export default Game;
