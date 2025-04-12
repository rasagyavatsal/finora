// src/pages/Contact.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
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
        <h2 className="text-4xl font-bold text-blue-700">Contact Us</h2>
        <p className="text-lg text-gray-700 mt-4">
          We’d love to hear from you! Reach out to us for any inquiries or support.
        </p>

        <form className="mt-10 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 mb-4 border rounded-lg"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 mb-4 border rounded-lg"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </main>

      <footer className="bg-blue-600 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Finora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
