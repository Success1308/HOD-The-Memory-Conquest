import { useState, useEffect } from "react";
import Modal from "./Modal";
import OptionButton from "./OptionButton";
import playAudio from "../playAudio";
import click from "../assets/click.mp3";
import "../styles/GameOverModal.css";

const clickAudio = new Audio(click);
clickAudio.volume = 0.3;

const options = [
  { label: "Play again", action: "playAgain" },
  { label: "Quit", action: "quit" },
  {
    label: "Keep playing",
    action: "continue",
    condition: (status) => status === "win",
  },
];

function GameOverModal({ score, onPlayAgain, onQuit, status, onContinue }) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
        case "ArrowLeft":
          navigateOptions(-1);
          break;
        case "ArrowDown":
        case "ArrowRight":
          navigateOptions(1);
          break;
        case "Enter":
          handleEnter();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedOptionIndex, status]); // Ensure dependencies are updated

  const navigateOptions = (increment) => {
    setSelectedOptionIndex((prevIndex) => {
      let newIndex = prevIndex + increment;
      const validOptions = options.filter(
        (option) => !option.condition || option.condition(status)
      );
      if (newIndex < 0) {
        newIndex = validOptions.length - 1;
      } else if (newIndex >= validOptions.length) {
        newIndex = 0;
      }
      playAudio(clickAudio);
      return newIndex;
    });
  };

  const handleEnter = () => {
    const selectedOption = filteredOptions[selectedOptionIndex];
    playAudio(clickAudio);
    if (selectedOption.action === "playAgain") {
      onPlayAgain();
    } else if (selectedOption.action === "quit") {
      onQuit();
    } else if (selectedOption.action === "continue") {
      onContinue();
    }
  };

  const filteredOptions = options.filter(
    (option) => !option.condition || option.condition(status)
  );

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
          {filteredOptions.map((option, index) => (
            <OptionButton
              key={index}
              onClick={() => handleEnter(option.action)}
              selected={index === selectedOptionIndex}
              onHoverChange={(isHovered) => {
                if (isHovered) {
                  setSelectedOptionIndex(index);
                }
              }}
            >
              {option.label}
            </OptionButton>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default GameOverModal;
