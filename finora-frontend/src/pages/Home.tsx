import React from "react";
import App from "../App";

const Home = () => {
  return (
    <div className="home-page p-6">
      <h2 className="text-xl font-bold mb-4">Welcome to the Gemini Financial Assistant</h2>
      <App /> {/* Import and render the main App component for file upload & Q&A */}
    </div>
  );
};

export default Home;
