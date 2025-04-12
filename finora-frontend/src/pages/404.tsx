// src/pages/404.tsx
import './styles/404.css';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-7xl font-extrabold text-blue-700">404</h1>
        <p className="mt-4 text-2xl text-blue-900">Oops! This page doesn’t exist.</p>
        <p className="mt-2 text-gray-700">Let’s get you back to where things make sense.</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
