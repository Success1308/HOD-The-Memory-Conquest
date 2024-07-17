import "../styles/OptionButton.css";
import click from "../assets/click.mp3";
import playAudio from "../playAudio";
const clickAudio = new Audio(click);
clickAudio.volume = 0.3;

export default function OptionButton({
  onClick,
  children,
  type = "button",
  selected,
}) {
  return (
    <button
      onClick={() => {
        playAudio(clickAudio);
        onClick?.();
      }}
      type={type}
      className={`option-button ${selected ? "selected" : ""}`}
    >
      {children}
    </button>
  );
}
