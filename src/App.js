import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles.css";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import StartScreen from "./pages/StartScreen";
import ReactionStage from "./pages/ReactionStage";
import ResultScreen from "./pages/ResultScreen";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/start" element={<StartScreen />} />
        <Route path="/reaction" element={<ReactionStage />} />
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
