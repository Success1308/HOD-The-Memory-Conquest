import { useState, useEffect, useRef } from "react";
import click from "../assets/click.mp3";
import playAudio from "../playAudio";
import OptionButton from "../components/OptionButton";
import "../styles/OptionButton.css";

const clickAudio = new Audio(click);
clickAudio.volume = 0.3;

const levels = [
  { label: "Peasant's\u00A0 Path", goal: 5, index: 0 },
  { label: "Knight's\u00A0 Challenge", goal: 10, index: 1 },
  { label: "Dragonlord's\u00A0 Trial", goal: 18, index: 2 },
];

export default function LevelSelectOptions({ onStartGame }) {
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);
  const selectedLevelRef = useRef(selectedLevel);

  useEffect(() => {
    selectedLevelRef.current = selectedLevel; // Update ref when state changes
  }, [selectedLevel]);
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp":
        case "ArrowLeft":
          navigateLevels(-1);
          break;
        case "ArrowDown":
        case "ArrowRight":
          navigateLevels(1);
          break;
        case "Enter":
          handleEnter(selectedLevelRef.current.goal);
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const navigateLevels = (increment) => {
    setSelectedLevel((prev) => {
      const newIndex = prev.index + increment;
      if (newIndex >= 0 && newIndex < levels.length) {
        playAudio(clickAudio);
        return levels[newIndex];
      }
      return prev;
    });
  };

  const handleEnter = (goal) => {
    onStartGame(goal);
    playAudio(clickAudio);
  };

  return (
    <div className="level-options">
      {levels.map((level) => (
        <OptionButton
          key={level.index}
          onClick={() => {
            setSelectedLevel(level);
            handleEnter(level.goal);
          }}
          selected={level.index === selectedLevel.index}
          onHoverChange={(isHovered) => {
            if (isHovered) {
              setSelectedLevel(level);
            }
          }}
        >
          {level.label}
        </OptionButton>
      ))}
    </div>
  );
}
