import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//CSS
import "./css/Global.css";
import "./css/components/Button.css";
import "./css/components/TextArea.css";
//Pages
import Home from "./pages";
import Score from "./pages/Score";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/" className="Switch-Page">Home</Link>
        <Link to="/score" className="Switch-Page">Score</Link>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/score" element={<Score />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
