// src/pages/Home.tsx
import React from 'react';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h1>Welcome to Finora 💸</h1>
        <p>Your Personal Debt & Finance Assistant.</p>
      </div>
    </div>
  );
};

export default Home;
