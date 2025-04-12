// src/pages/Home.tsx
import React from 'react';

const Home = () => {
  return (
    <div className="bg-blue-50 min-h-screen text-gray-900">
      <header className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Finora</h1>
          <nav className="space-x-6">
            <a href="/" className="hover:text-blue-200">Home</a>
            <a href="/about" className="hover:text-blue-200">About</a>
            <a href="/contact" className="hover:text-blue-200">Contact</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold text-blue-700">Welcome to Finora</h2>
        <p className="text-lg text-gray-700 mt-4">Your trusted personal finance assistant.</p>

        <div className="mt-10">
          <a href="/about">
            <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
              Learn More About Us
            </button>
          </a>
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

export default Home;
