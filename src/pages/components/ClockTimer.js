import React, { useState, useEffect } from 'react';
import './styles.css';  // Zorg ervoor dat je CSS-bestand is geïmporteerd

function ClockTimer() {
  const [minutes, setMinutes] = useState(20);
  const [seconds, setSeconds] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes]);

  useEffect(() => {
    const totalTime = 20 * 60; // 20 minuten in seconden
    const elapsedTime = (20 * 60 - (minutes * 60 + seconds));
    const degree = (elapsedTime / totalTime) * 360;
    setRotation(degree);
  }, [minutes, seconds]);

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className="timer-container">
      <div className="clock-timer">
        <div className="clock-background">
          <div className="clock-stripes"></div>
          <div className="minute-markers"></div>
          <div
            className="clock-foreground"
            style={{ transform: `rotate(${rotation}deg)` }}
          ></div>
        </div>
      </div>
      <div className="digital-timer">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>
    </div>
  );
}

export default ClockTimer;
