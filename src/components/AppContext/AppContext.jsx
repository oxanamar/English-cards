// src/context/AppContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// API URL
const API_URL = "https://itgirlschool.justmakeit.ru/api/words";

// Create Context
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch words from API
  const fetchWords = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setWords(response.data);
    } catch (err) {
      setError("Failed to fetch words");
    } finally {
      setLoading(false);
    }
  };

  // Add new word
  const addWord = async (newWord) => {
    try {
      const response = await axios.post(API_URL, newWord);
      setWords((prevWords) => [...prevWords, response.data]);
    } catch (err) {
      setError("Failed to add word");
    }
  };

  // Update word
  const updateWord = async (id, updatedWord) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedWord);
      setWords((prevWords) =>
        prevWords.map((word) => (word.id === id ? updatedWord : word))
      );
    } catch (err) {
      setError("Failed to update word");
    }
  };

  // Delete word
  const deleteWord = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setWords((prevWords) => prevWords.filter((word) => word.id !== id));
    } catch (err) {
      setError("Failed to delete word");
    }
  };

  // Fetch words on mount
  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <AppContext.Provider
      value={{
        words,
        loading,
        error,
        fetchWords,
        addWord,
        updateWord,
        deleteWord,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
