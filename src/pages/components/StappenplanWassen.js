import React, { useState } from 'react';
import './StappenplanOchtend.css';  
import ClockTimer from './ClockTimer'; // Zorg ervoor dat dit pad correct is!

function StappenplanOchtend() {
  const [stappenLijst, setStappenLijst] = useState([
    { id: 1, text: "Opstaan 🛏️ – Sta op en rek je even uit.", completed: false },
    { id: 2, text: "Naar het toilet gaan 🚽 – Ga eerst even naar het toilet.", completed: false },
    { id: 3, text: "Pyjama uitdoen 👕 – Doe je pyjama uit en leg hem netjes weg.", completed: false },
    { id: 4, text: "Wassen 🚿 – Was je gezicht en handen.", completed: false },
    { id: 5, text: "Tanden poetsen 🦷 – Poets je tanden goed.", completed: false },
    { id: 6, text: "Aankleden 👖 – Trek je kleren aan.", completed: false },
    { id: 7, text: "Haren kammen 💇‍♂️ – Kam je haren netjes.", completed: false },
    { id: 8, text: "Ik laat de badkamer netjes achter 🧼 – Ruim alles op en maak de wastafel schoon.", completed: false },
  ]);

  const [timerActief, setTimerActief] = useState(false);
  const [tijdOver, setTijdOver] = useState(1200); // 20 minuten in seconden

  // Timer starten
  const startTimer = () => {
    setTimerActief(true);
  };

  // Timer resetten
  const resetTimer = () => {
    setTijdOver(1200); 
    setTimerActief(false);
    setTimeout(() => setTimerActief(true), 10);
  };

  // Toggle voor voltooien van stappen
  const toggleStap = (id) => {
    setStappenLijst((prevLijst) =>
      prevLijst.map((stap) =>
        stap.id === id ? { ...stap, completed: !stap.completed } : stap
      )
    );
  };

  return (
    <div className="stappenplan-container">
      <h1>Ochtendroutine</h1>
      <p>Je hebt 20 minuten om alle stappen te voltooien!</p>

      {/* Timer wordt alleen getoond als hij actief is */}
      {timerActief && <ClockTimer tijdOver={tijdOver} setTijdOver={setTijdOver} />}

      {/* Start/Reset knoppen */}
      {!timerActief ? (
        <button onClick={startTimer}>Start Timer</button>
      ) : (
        <button onClick={resetTimer}>Reset Timer</button>
      )}

      {/* Stappenlijst */}
      <ul>
        {stappenLijst.map((stap) => (
          <li
            key={stap.id}
            className={stap.completed ? "completed" : ""}
            onClick={() => toggleStap(stap.id)}
          >
            {stap.completed ? "✅ " : "⬜ "} {stap.text}
          </li>
        ))}
      </ul>

      {/* Congratulatie bij het voltooien van alle stappen */}
      {stappenLijst.every((stap) => stap.completed) && (
        <div className="congratulations">
          🎉 Goed gedaan! Alle stappen zijn voltooid! 🎉
        </div>
      )}
    </div>
  );
}

export default StappenplanOchtend;
