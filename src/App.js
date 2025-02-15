import React from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./assets/logo.png";
import kalendersIcon from "./assets/kalenders.png";
import stappenplannenIcon from "./assets/stappenplannen.png";
import timersIcon from "./assets/timers.png";
import menuIcon from "./assets/menu.png";
import Stappenplannen from "./pages/Stappenplannen"; // Zorg ervoor dat het pad klopt
import StappenplanOchtend from "./pages/components/StappenplanOchtend"; // Zorg ervoor dat het pad klopt

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stappenplannen" element={<Stappenplannen />} />
        <Route path="/stappenplan/dagelijkse-routines/ochtend" element={<StappenplanOchtend />} />
      </Routes>
    </Router>
  );
}

export default App;

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header className="header">
        <img
          src={logo}
          alt="Fokus Logo"
          className="logo"
          onClick={() => window.location.reload()}
        />
        <div className="welcome-text">
          <h1>
            <span className="antraciet">👋 Welkom bij </span>
            <span className="appelblauwzeegroen">F</span>
            <span className="rood">O</span>
            <span className="appelblauwzeegroen">KUS</span>
          </h1>
          <p>Jouw hulp voor een rustige en fijne dag.</p>
        </div>
      </header>
      <div className="spacer"></div>
      <section className="icon-section">
        <img
          src={kalendersIcon}
          alt="Kalenders"
          className="icon"
          onClick={() => navigate("/kalenders")}
        />
        <img
          src={stappenplannenIcon}
          alt="Stappenplannen"
          className="icon"
          onClick={() => navigate("/stappenplannen")}
        />
        <img
          src={timersIcon}
          alt="Timers"
          className="icon"
          onClick={() => navigate("/timers")}
        />
        <img
          src={menuIcon}
          alt="Menu"
          className="icon"
          onClick={() => navigate("/menu")}
        />
      </section>
    </div>
  );
}
