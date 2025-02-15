import React from 'react';

function Homepage() {
  return (
    <div style={styles.container}>
      {/* Navigatiebalk */}
      <nav style={styles.navbar}>
        <h1 style={styles.logo}>Kidskalender</h1>
      </nav>

      {/* Hoofdcontent */}
      <div style={styles.content}>
        <h2>Welkom op de Kidskalender! 🎉</h2>
        <p>Hier komt jouw interactieve kalender en to-do lijst.</p>
        <p>Klik op het menu om naar verschillende secties te gaan.</p>
      </div>
    </div>
  );
}

// Stijlen (inline CSS)
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    height: '100vh',
  },
  navbar: {
    backgroundColor: '#ffcc00',
    padding: '15px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    margin: '0',
    fontSize: '24px',
  },
  content: {
    marginTop: '50px',
    padding: '20px',
  },
};

export default Homepage;
