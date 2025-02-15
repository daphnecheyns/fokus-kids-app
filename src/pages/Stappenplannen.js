import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Stappenplannen.css";
import logo from "../assets/logo.png"; // Correcte import van het logo

// Importeer de verschillende stappenplannen
import StappenplanOchtend from "./components/StappenplanOchtend";
import StappenplanVertrekken from "./components/StappenplanVertrekken";
import StappenplanAvond from "./components/StappenplanAvond";
import StappenplanHuiswerkmaken from "./components/StappenplanHuiswerkmaken"
import StappenplanTandenPoetsen from "./components/StappenplanTandenPoetsen";
import StappenplanWassen from "./components/StappenplanWassen";

function Stappenplannen() {
  const navigate = useNavigate();
  const [geselecteerdPlan, setGeselecteerdPlan] = useState(null); // Houdt het geselecteerde plan bij

  return (
    <div className="stappenplannen-container">
      <header className="header">
        <img
          src={logo}
          alt="Logo"
          className="logo"
          onClick={() => navigate("/")}
        />
        <div className="welcome-text">
          <h1>
            <span className="check">✅</span> Stappenplannen
          </h1>
          <p>Voer taken op een leuke manier uit.</p>
        </div>
      </header>

      <div className="content">
        {/* Links: Lijst met stappenplannen */}
        <nav className="menu">
          <h2>DAGELIJKSE ROUTINES</h2>
          <ul>
            <li onClick={() => setGeselecteerdPlan("ochtend")}>
              ☀️ Ik maak mij 's ochtends klaar
            </li>
            <li onClick={() => setGeselecteerdPlan("vertrekken")}>
              👋 Ik maak mij klaar om te vertrekken
            </li>
            <li onClick={() => setGeselecteerdPlan("avond")}>
              🌙 Ik maak mij klaar voor bed
            </li>
            <li onClick={() => setGeselecteerdPlan("huiswerk")}>
              📝 Ik maak mijn huiswerk
            </li>
          </ul>
          <div style={{ height: '20px' }}></div>
          <h2>INDIVIDUELE TAKEN</h2>
          <ul>
            <li onClick={() => setGeselecteerdPlan("tanden-poetsen")}>
              🦷 Tanden poetsen
            </li>
            <li onClick={() => setGeselecteerdPlan("wassen")}>
              🚿 Wassen
            </li>
          </ul>
        </nav>

        {/* Rechts: Geselecteerde stappenplan tonen */}
        <main className="stappenplan-content">
          {geselecteerdPlan === "ochtend" && <StappenplanOchtend />}
          {geselecteerdPlan === "vertrekken" && <StappenplanVertrekken />}
          {geselecteerdPlan === "avond" && <StappenplanAvond />}
          {geselecteerdPlan === "huiswerk" && <StappenplanHuiswerkmaken />}
          {geselecteerdPlan === "tanden-poetsen" && <StappenplanTandenPoetsen />}
          {geselecteerdPlan === "wassen" && <StappenplanWassen />}
          {!geselecteerdPlan && <p>Kies een stappenplan om te starten.</p>}
        </main>
      </div>
    </div>
  );
}

export default Stappenplannen;
