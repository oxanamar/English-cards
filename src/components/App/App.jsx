// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WordProvider } from "../../context/WordContext";
import Table from "../Table/Table";
import Game from "../Game/Game";
import Header from "../Header/Header";
import ErrorPage from "../ErrorPage/ErrorPage";
import "./App.css";

function App() {
  return (
    <WordProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </WordProvider>
  );
}

export default App;
