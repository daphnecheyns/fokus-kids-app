import React, { useState, useEffect } from 'react';
import './StappenplanAvond.css';
import { Howl } from 'howler';
import successSound from '../sounds/stappenplangelukt.mp3';
import failSound from '../sounds/stappenplanfail.mp3';
import confetti from 'canvas-confetti';

function StappenplanAvond() {
  const [stappenLijst, setStappenLijst] = useState([
    { id: 1, text: "Opruimen ✏️ – Ruim je spullen netjes op.", completed: false },
    { id: 2, text: "Wassen 🚿 – Neem een douche, bad of was je aan de lavabo.", completed: false },
    { id: 3, text: "Pyjama aandoen 👕 – Trek je pyjama aan.", completed: false },
    { id: 4, text: "Haren kammen 💇‍♂️ – Kam je haren netjes.", completed: false },
    { id: 5, text: "Tanden poetsen 🦷 – Poets je tanden goed.", completed: false },
    { id: 6, text: "Badkamer netjes achterlaten 🧼 – Ruim alles op en maak de wastafel schoon.", completed: false },
  ]);

  const [timerActief, setTimerActief] = useState(false);
  const [tijdOver, setTijdOver] = useState(3600); // 30 minuten in seconden
  const [completed, setCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');
  const [failed, setFailed] = useState(false);
  let wakeLock = null;

  async function requestWakeLock() {
    if ('wakeLock' in navigator) {
      try {
        wakeLock = await navigator.wakeLock.request('screen');
      } catch (err) {
        console.error("Wake lock mislukt:", err);
      }
    }
  }

  async function releaseWakeLock() {
    if (wakeLock) {
      await wakeLock.release();
      wakeLock = null;
    }
  }

  useEffect(() => {
    let timerInterval;
    if (timerActief && tijdOver > 0 && !completed) {
      requestWakeLock();
      timerInterval = setInterval(() => {
        setTijdOver((prevTijdOver) => {
          if (prevTijdOver <= 1) {
            clearInterval(timerInterval);
            setFailed(true);
            releaseWakeLock();
            return 0;
          }
          return prevTijdOver - 1;
        });
      }, 1000);
    } else {
      releaseWakeLock();
    }
    return () => {
      clearInterval(timerInterval);
      releaseWakeLock();
    };
  }, [timerActief, tijdOver, completed]);

  const startTimer = () => {
    setTimerActief(true);
  };

  const resetTimer = () => {
    setTijdOver(1200);
    setTimerActief(false);
    setStappenLijst(stappenLijst.map(stap => ({ ...stap, completed: false })));
    setCompleted(false);
    setCompletionMessage('');
    setFailed(false);
    releaseWakeLock();
  };

  const toggleStap = (id) => {
    if (timerActief) {
      setStappenLijst((prevLijst) =>
        prevLijst.map((stap) =>
          stap.id === id ? { ...stap, completed: !stap.completed } : stap
        )
      );
    }
  };

  const checkCompletion = () => {
    const allCompleted = stappenLijst.every((stap) => stap.completed);
    if (allCompleted && !completed) {
      setCompleted(true);
      const successSoundEffect = new Howl({ src: [successSound] });
      successSoundEffect.play();
      playConfetti();
      setCompletionMessage('🎉 Goed gedaan! Nu mag je nog wat ontpannen in de zetel en naar tv kijken! 🎉');
      setTimerActief(false);
      releaseWakeLock();
    }
  };

  const playConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  useEffect(() => {
    checkCompletion();
  }, [stappenLijst]);

  useEffect(() => {
    if (tijdOver === 0 && !completed) {
      const failSoundEffect = new Howl({ src: [failSound] });
      failSoundEffect.play();
      setCompletionMessage('😢 Jammer, volgende keer minder treuzelen! 😢');
      setFailed(true);
      releaseWakeLock();
    }
  }, [tijdOver, completed]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const calculateProgress = () => {
    const totalTime = 1200;
    return (1 - tijdOver / totalTime) * 100;
  };

  return (
    <div className={`stappenplan-container ${completed ? 'completed' : ''}`}>
      <div className="header" style={{ backgroundColor: 'white' }}>
        <div className="title-container">
          <h1 className="title" style={{ fontFamily: 'Genty Sans, sans-serif', fontSize: '40px', color: 'var(--app)', margin: 3 }}>Avondroutine</h1>
          <div className="timer-button-container" style={{ margin: 10 }}>
            {!timerActief && !completed && !failed ? (
              <button className="start-btn" onClick={startTimer}>Start Timer</button>
            ) : (
              <button className="reset-btn" onClick={resetTimer}>Reset Timer</button>
            )}
          </div>
        </div>
        <div className="timer-container" style={{ margin: 12 }}>
          <div 
            className="timer-circle"
            style={{ '--timer-progress': calculateProgress() }}
          >
            {timerActief ? <div className="digital-clock">{formatTime(tijdOver)}</div> : formatTime(tijdOver)}
          </div>
        </div>
      </div> 

      {!completed && tijdOver > 0 && (
        <ul className="stappenlijst" style={{ margin: 0 }}>
          {stappenLijst.map((stap) => (
            <li
              key={stap.id}
              className={`stap-item ${stap.completed ? "completed" : ""}`}
              onClick={() => timerActief && toggleStap(stap.id)}
            >
              {stap.completed ? "✅ " : "⬜ "} {stap.text}
            </li>
          ))}
        </ul>
      )}

      {completionMessage && (
        <div className={`completion-message ${completed ? 'success' : 'fail'}`}>
          {completionMessage}
        </div>
      )}
    </div>
  );
}

export default StappenplanAvond;
