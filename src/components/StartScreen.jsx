import "../styles/StartScreen.css";
import Modal from "./Modal";
import OptionButton from "./OptionButton";
import click from "../assets/click.mp3";
import LevelSelectOptions from "./LevelSelectOptions";
const clickAudio = new Audio(click);
clickAudio.volume = 0.3;

export default function StartScreen({ onStart }) {
  return (
    <div className="start-screen-container">
      <h1 className="start-screen-header1">
        <img src={`./Mediamodifier-Design1.svg`} alt="logo" className="logo1" />
        <div className="dragonDiv1">
          <span className="dragonHead1">House of The Dragon</span>
          <span className="dragonTitle1">The Memory Conquest</span>
        </div>
        <img src={`./Mediamodifier-Design1.svg`} alt="logo" className="logo1" />
      </h1>
      <Modal>
        <div className="start-screen-modal-content modal-content">
          <p className="ask-text">
            &quot; Choose your quest, brave soul ! &quot;
          </p>

          <div className="start-screen-menu">
            <LevelSelectOptions onStartGame={onStart} />
            <OptionButton
              onClick={() =>
                window.open("https://github.com/Success1308", "_blank")
              }
            >
              <img src={"/github-142-svgrepo-com.svg"} alt="GitHub Logo" />
            </OptionButton>
          </div>
        </div>
      </Modal>
    </div>
  );
}
