import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//CSS
import "./css/Global.css";
import "./css/Score.css";
import "./css/SetupMenu.css";
import "./css/ScoringChart.css";
import "./css/FinalScoreStats.css";
import "./css/components/Slider.css";
import "./css/components/Button.css";
import "./css/components/RadioButton.css";
import "./css/components/TextArea.css";
//Pages
import Score from "./pages";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/" className="Switch-Page">
          Score
        </Link>
        <Link to="/about" className="Switch-Page">
          About
        </Link>
      </nav>
      <Routes>
        <Route exact path="/" element={<Score />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
