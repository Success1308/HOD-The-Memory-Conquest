import "../styles/GameOverModal.css";
import Modal from "./Modal";
import OptionButton from "./OptionButton";

function GameOverModal({ score, onPlayAgain, onQuit, status, onContinue }) {
  return (
    <Modal>
      <div
        className="game-over-modal-content modal-content"
        data-status={status}
      >
        <h2>{status === "win" ? "You Win!" : "Game Over!"}</h2>
        {status && (
          <img
            src={status === "win" ? "/applaud-clap.gif" : "/defeat.gif"}
            className="status-gif"
            alt="game status"
          />
        )}

        <div className="final-stats">
          <span className="final-score">Your final score is </span>
          <span className="final-score-number">{score}</span>
        </div>

        <div className="options">
          {status === "win" && (
            <OptionButton onClick={onContinue}>Keep playing</OptionButton>
          )}
          <OptionButton onClick={onPlayAgain}>Play again</OptionButton>
          <OptionButton onClick={onQuit}>Quit</OptionButton>
        </div>
      </div>
    </Modal>
  );
}

export default GameOverModal;
