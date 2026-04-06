import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [age, setAge] = useState(18);
  const [mathScore, setMathScore] = useState(50);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/predict`
    : "https://samuel-backend-1.onrender.com/predict";

  const predict = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(API_URL, {
        age: Number(age),
        math_score: Number(mathScore),
      });
      setResult(res.data);
    } catch (e) {
      setError("Server error. Check API URL or backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>🚀 Zionyx AI</h2>

        <p>Age: <b>{age}</b></p>
        <input
          type="range"
          min="10"
          max="25"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <p>Math Score: <b>{mathScore}</b></p>
        <input
          type="range"
          min="0"
          max="100"
          value={mathScore}
          onChange={(e) => setMathScore(e.target.value)}
        />

        <button onClick={predict} disabled={loading}>
          {loading ? "Analyzing..." : "Predict Career"}
        </button>

        {error && <p className="error">{error}</p>}

        {result && (
          <div className="result">
            <h3>🎯 {result.career}</h3>
            {result.confidence && (
              <p>Confidence: {result.confidence.toFixed(2)}%</p>
            )}

            <h4>Skills</h4>
            {result.skills.map((s, i) => (
              <p key={i}>✅ {s}</p>
            ))}

            <h4>Recommendations</h4>
            {result.recommendations.map((r, i) => (
              <p key={i}>👉 {r}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}