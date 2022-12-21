import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//CSS
import "./css/Global.css";
import "./css/Score.css";
import "./css/SetupMenu.css";
import "./css/Profile.css";
import "./css/ScoringChart.css";
import "./css/FinalScoreStats.css";
import "./css/components/NavBar.css";
import "./css/components/Slider.css";
import "./css/components/Button.css";
import "./css/components/RadioButton.css";
import "./css/components/TextArea.css";
//Pages
import Score from "./pages";
import About from "./pages/About";
import Account from "./pages/Account";

import NavBar from "./components/elements/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Score />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="*" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
