import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import Game from "../Game/Game";
import ErrorPage from "../ErrorPage/ErrorPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<Table />} />

          {/* Game page route */}
          <Route path="/game" element={<Game />} />

          {/* Catch-all route for unknown paths */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
