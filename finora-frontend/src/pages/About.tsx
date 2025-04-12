// src/pages/About.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-blue-50 min-h-screen text-gray-900">
      <header className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Finora</h1>
          <nav className="space-x-6">
            <Link to="/" className="hover:text-blue-200">Home</Link>
            <Link to="/about" className="hover:text-blue-200">About</Link>
            <Link to="/contact" className="hover:text-blue-200">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-blue-700">About Finora</h2>
        <p className="text-lg text-gray-700 mt-4">
          Finora is your AI-driven financial assistant, designed to help you manage your finances with ease and efficiency.
        </p>

        <div className="mt-10">
          <Link to="/">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
              Back to Home
            </button>
          </Link>
        </div>
      </main>

      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Finora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
