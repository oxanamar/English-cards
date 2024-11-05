import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "../Header/Header";
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
import Game from "../Game/Game";
import LandingPage from "../LandingPage/LandingPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import "./App.css";

function App() {
  const [isFirstVisit, setIsFirstVisit] = useState(null);

  useEffect(() => {
    // Check if it's the user's first visit
    const visited = localStorage.getItem("visited");
    setIsFirstVisit(!visited); // Set to true if "visited" is not in localStorage
  }, []);

  const markAsVisited = () => {
    localStorage.setItem("visited", "true");
    setIsFirstVisit(false);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Conditionally render the Header based on whether it's the landing page */}
        <Header isLandingPage={isFirstVisit} />

        <div className="content-container">
          <Routes>
            {isFirstVisit === null ? null : isFirstVisit ? (
              // Landing page route
              <Route
                path="/"
                element={<LandingPage markAsVisited={markAsVisited} />}
              />
            ) : (
              <>
                {/* Home page route */}
                <Route path="/" element={<Table />} />

                {/* Game page route */}
                <Route path="/game" element={<Game />} />

                {/* Catch-all route for unknown paths */}
                <Route path="*" element={<ErrorPage />} />
              </>
            )}
          </Routes>
        </div>

        {/* Show footer only if not on the landing page */}
        {!isFirstVisit && <Footer />}
      </div>
    </Router>
  );
}

export default App;
