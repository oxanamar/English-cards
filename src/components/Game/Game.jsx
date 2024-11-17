import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { wordStore } from "../../stores/WordStore";
import styles from "./game.module.css";

const Game = observer(() => {
  const { words } = wordStore;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showRussian, setShowRussian] = useState(false);
  const [learnedWords, setLearnedWords] = useState(new Set());

  if (words.length === 0)
    return <p className={styles.noWords}>No words available</p>;

  const currentCard = words[currentCardIndex];

  const handleCheck = () => {
    setShowRussian(true);
    setLearnedWords((prevLearnedWords) => {
      const updatedSet = new Set(prevLearnedWords);
      updatedSet.add(currentCardIndex);
      return updatedSet;
    });
  };

  const handleTranslationClick = () => {
    setShowRussian(false);
  };

  const nextCard = () => {
    if (currentCardIndex < words.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowRussian(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowRussian(false);
    }
  };

  return (
    <div className={styles["game-container"]}>
      <div className={styles["card-navigation"]}>
        <button
          className={styles["btn-nav"]}
          onClick={prevCard}
          disabled={currentCardIndex === 0}
        >
          &lt;
        </button>

        <div className={styles.card}>
          <h2>{currentCard.english}</h2>
          <p className={styles.transcription}>{currentCard.transcription}</p>
          {showRussian ? (
            <p className={styles.russian} onClick={handleTranslationClick}>
              {currentCard.russian}
            </p>
          ) : (
            <button className={styles["btn-check"]} onClick={handleCheck}>
              CHECK
            </button>
          )}
        </div>

        <button
          className={styles["btn-nav"]}
          onClick={nextCard}
          disabled={currentCardIndex === words.length - 1}
        >
          &gt;
        </button>
      </div>

      <p className={styles.progress}>
        You’ve learned {learnedWords.size} out of {words.length} words!
      </p>
    </div>
  );
});

export default Game;
