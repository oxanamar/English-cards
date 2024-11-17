// src/context/WordContext.js
import React, { createContext } from "react";
import { wordStore } from "../stores/WordStore";

export const WordContext = createContext(wordStore);

export const WordProvider = ({ children }) => {
  return (
    <WordContext.Provider value={wordStore}>{children}</WordContext.Provider>
  );
};
