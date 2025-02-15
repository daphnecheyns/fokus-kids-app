import React, { useState, useEffect } from 'react';
import './styles.css';  // Zorg ervoor dat je CSS-bestand goed geïmporteerd is (controleer het pad)

function ClockTimer() {
  const [minutes, setMinutes] = useState(20);  // Starttijd van 20 minuten
  const [seconds, setSeconds] = useState(0);   // Starttijd van 0 seconden
  const [rotation, setRotation] = useState(0);  // Variabele voor klokrotatie

  // Deze effect zorgt ervoor dat de timer elke seconde aftelt
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);  // Aftellen van de seconden
      } else if (minutes > 0) {
        setMinutes(minutes - 1);  // Aftellen van de minuten
        setSeconds(59);  // Zet seconden weer naar 59 als de minuten aftellen
      }
    }, 1000);

    return () => clearInterval(interval);  // Opruimen van interval na gebruik
  }, [seconds, minutes]);

  // Effect voor het bijwerken van de rotatie van de klok (om de voortgang weer te geven)
  useEffect(() => {
    const totalTime = 20 * 60;  // Totale tijd (20 minuten in seconden)
    const elapsedTime = (20 * 60 - (minutes * 60 + seconds));  // Berekent hoeveel tijd al verstreken is
    const degree = (elapsedTime / totalTime) * 360;  // Bereken de rotatiehoek
    setRotation(degree);  // Pas de rotatie toe
  }, [minutes, seconds]);

  // Formatteren van de tijd om altijd twee cijfers weer te geven
  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;  // Als tijd minder dan 10 is, voeg een nul toe
  };

  return (
    <div className="timer-container">
      <div className="clock-timer">
        <div className="clock-background">
          <div className="clock-stripes"></div>
          <div className="minute-markers"></div>
          <div
            className="clock-foreground"
            style={{ transform: `rotate(${rotation}deg)` }} // Rotatie toepassen op de klok
          ></div>
        </div>
      </div>
      <div className="digital-timer">
        {formatTime(minutes)}:{formatTime(seconds)}  {/* Toon de digitale timer */}
      </div>
    </div>
  );
}

export default ClockTimer;
