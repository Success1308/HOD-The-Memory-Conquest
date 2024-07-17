import "../styles/Score.css";

export default function Score({ currentScore, bestScore }) {
  return (
    <div className="stats">
      <p className="current-score">
        Score:{" "}
        <span>
          <b>{currentScore}</b>
        </span>
      </p>
      <p className="best-score">
        High Score:{" "}
        <span>
          <b>{bestScore}</b>
        </span>
      </p>
    </div>
  );
}
