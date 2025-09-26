import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ReactionStage() {
  const navigate = useNavigate();
  const [lights, setLights] = useState(0);
  const [phase, setPhase] = useState("countdown"); // "countdown" | "waiting" | "tap"
  const [startTime, setStartTime] = useState(null);

  // Preload sounds
  const beep = new Audio("/sounds/beep.mp3"); // short beep
  const goSound = new Audio("/sounds/go.mp3"); // start/airgun sound

  // Countdown phase (1 to 5 red lights)
  useEffect(() => {
    if (phase === "countdown" && lights < 5) {
      const timer = setTimeout(() => {
        setLights((prev) => prev + 1);
        beep.play().catch(() => {}); // play beep, ignore autoplay block
      }, 700);
      return () => clearTimeout(timer);
    }

    if (phase === "countdown" && lights === 5) {
      setPhase("waiting");
    }
  }, [phase, lights]);

  // Waiting phase (random delay before lights out)
  useEffect(() => {
    if (phase === "waiting") {
      const delay = 1000 + Math.random() * 2000; // 1–3s
      const timer = setTimeout(() => {
        setLights(0); // lights out
        setPhase("tap");
        setStartTime(Date.now());
        goSound.play().catch(() => {}); // play start sound
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleTap = () => {
    if (phase !== "tap") return; // ignore false starts
    const time = Date.now() - startTime;
    navigate("/result", { state: { reactionTime: time } });
  };

  return (
    <div className="reaction-container">
      <h2>Get Ready...</h2>
      <div className="lights">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`light ${i < lights ? "on" : ""}`}></div>
        ))}
      </div>

      {phase === "waiting" && (
        <p className="wait-text">Wait for lights out...</p>
      )}
      {phase === "tap" && (
        <button className="tap-btn" onClick={handleTap}>
          TAP!
        </button>
      )}
    </div>
  );
}

export default ReactionStage;
