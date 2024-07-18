import { useState, useEffect } from "react";
import click from "../assets/click.mp3";
import playAudio from "../playAudio";
import "../styles/OptionButton.css";

const clickAudio = new Audio(click);
clickAudio.volume = 0.3;

export default function OptionButton({
  onClick,
  children,
  type = "button",
  selected,
  onHoverChange,
}) {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (selected) {
      setIsHovered(false);
    }
  }, [selected]);

  return (
    <button
      onClick={() => {
        playAudio(clickAudio);
        onClick?.();
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverChange(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverChange(false);
      }}
      type={type}
      className={`option-button ${selected || isHovered ? "selected" : ""}`}
    >
      {children}
    </button>
  );
}
