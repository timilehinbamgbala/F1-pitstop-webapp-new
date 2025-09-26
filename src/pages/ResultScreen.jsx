import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { reactionTime } = location.state || { reactionTime: null };

  // Decide medal based on time
  let medal = "";
  if (reactionTime !== null) {
    if (reactionTime < 250) medal = "Wow, You must be Valttri Bottas";
    else if (reactionTime < 400) medal = "You are faster than most people";
    else if (reactionTime < 1000)
      medal = "You are slower than HAAS pit-stop (monaco 2025)";
    else medal = "BRUH!!!";
  }

  const handleRetry = () => {
    navigate("/reaction");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  // Save personal best + global leaderboard
  if (reactionTime !== null) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Update personal best
      users = users.map((u) => {
        if (u.email === currentUser.email) {
          if (!u.bestTime || reactionTime < u.bestTime) {
            u.bestTime = reactionTime;
          }
        }
        return u;
      });
      localStorage.setItem("users", JSON.stringify(users));

      // Update global leaderboard
      let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
      leaderboard.push({
        username: currentUser.username,
        time: reactionTime,
        date: new Date().toLocaleString(),
      });

      // Sorting the leaderboard
      leaderboard.sort((a, b) => a.time - b.time);
      leaderboard = leaderboard.slice(0, 10);

      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }
  }

  return (
    <div className="result-container">
      <h2>Results</h2>
      {reactionTime !== null ? (
        <>
          <p>
            Your reaction time: <strong>{reactionTime} ms</strong>
          </p>
          <p className="medal">Review: {medal}</p>
        </>
      ) : (
        <p>No reaction time recorded!</p>
      )}
      <button onClick={handleRetry}>Try Again</button>
      <button className="back" onClick={() => navigate("/start")}>
        Back to Start Screen{" "}
      </button>
      <button className="logout" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default ResultScreen;
