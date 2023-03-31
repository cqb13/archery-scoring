import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
//CSS
import "./css/Global.css";
import "./css/FinalScoreStats.css";
import "./css/components/Stat.css";
import "./css/components/Chart.css";
import "./css/components/Popup.css";
import "./css/components/NavBar.css";
import "./css/components/Slider.css";
import "./css/components/Button.css";
import "./css/components/TextArea.css";
import "./css/components/Dropdown.css";
import "./css/components/TextInputs.css";
import "./css/components/ToggleButton.css";
//Pages
import Account from "./pages/Account";
import History from "./pages/History";
import Score from "./pages";

import NavBar from "./components/elements/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Score />} />
        <Route path='/history' element={<History />} />
        <Route path='/account' element={<Account />} />
        <Route path='*' element={<Score />} />
      </Routes>
    </Router>
  );
}

export default App;
