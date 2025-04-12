import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom"; // If using routing

// Render the App component
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
