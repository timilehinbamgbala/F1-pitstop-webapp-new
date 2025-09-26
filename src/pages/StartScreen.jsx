import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StartScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="start-container">
      <h2>Welcome {user ? user.username : "Driver"} 🏎️</h2>
      <p>Get ready for your pit stop reaction test</p>
      <button onClick={() => navigate("/reaction")}>Start Pit Stop</button>
      <button onClick={() => navigate("/leaderboard")}>View Leaderboard</button>
      <button className="logout" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default StartScreen;
