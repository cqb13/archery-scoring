import React from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//CSS
import "./css/Global.css";
//Pages
import Home from "./pages";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/" className="Switch-Page">Home</Link>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
