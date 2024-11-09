import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppProvider } from "../AppContext/AppContext";
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
    const visited = localStorage.getItem("visited");
    setIsFirstVisit(!visited);
  }, []);

  const markAsVisited = () => {
    localStorage.setItem("visited", "true");
    setIsFirstVisit(false);
  };

  return (
    <AppProvider>
      <Router>
        <div className="app-container">
          <Header isLandingPage={isFirstVisit} />
          <div className="content-container">
            <Routes>
              {isFirstVisit === null ? null : isFirstVisit ? (
                <Route
                  path="/"
                  element={<LandingPage markAsVisited={markAsVisited} />}
                />
              ) : (
                <>
                  <Route path="/" element={<Table />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="*" element={<ErrorPage />} />
                </>
              )}
            </Routes>
          </div>
          {!isFirstVisit && <Footer />}
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
