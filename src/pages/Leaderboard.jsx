import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setScores(leaderboard);
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>🏁 Global Leaderboard 🏁</h2>
      {scores.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Driver</th>
              <th>Time (ms)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{s.username}</td>
                <td>{s.time}</td>
                <td>{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No results yet. Be the first driver!</p>
      )}
      <button onClick={() => navigate("/start")}>Back to Start</button>
    </div>
  );
}

export default Leaderboard;
