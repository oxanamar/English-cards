import React, { useState, useContext } from "react";
import { AppContext } from "../AppContext/AppContext";
import Loader from "../Loader/Loader"; // Import the Loader component
import styles from "./game.module.css";

function Game() {
  const { words, loading, error } = useContext(AppContext);

  // Tracks the current card index
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  // Toggles the Russian translation
  const [showRussian, setShowRussian] = useState(false);
  // Stores the IDs of learned words
  const [learnedWords, setLearnedWords] = useState(new Set());

  // Display Loader while loading
  if (loading) return <Loader />;
  if (error) return <p className="error">{error}</p>;

  // Check if words array is not empty and get the current card
  const currentCard = words.length > 0 ? words[currentCardIndex] : null;

  const handleCheck = () => {
    setShowRussian(true);

    // Add the current word to the set of learned words (avoiding duplicates)
    setLearnedWords((prevLearnedWords) => {
      const updatedSet = new Set(prevLearnedWords);
      updatedSet.add(currentCardIndex); // Track word by its index
      return updatedSet;
    });
  };

  const nextCard = () => {
    if (currentCardIndex < words.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowRussian(false); // Hide Russian translation for new card
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowRussian(false); // Hide Russian translation for new card
    }
  };

  if (!currentCard) return <p>No words available</p>;

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
            disabled={currentCardIndex === words.length - 1}
          >
            &gt; {/* Right Arrow */}
          </button>
        </div>
      </div>

      <p>
        You've learned {learnedWords.size} out of {words.length} words!
      </p>
    </div>
  );
}

export default Game;
