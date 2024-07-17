import { memo, useState } from "react";
import "../styles/BGMToggle.css";
import click from "../assets/click.mp3";
import playAudio from "../playAudio";
import victoryGOT from "../assets/winmusic.mp3";
import defeatGOT from "../assets/losemusic.mp3";
import openingGOT from "../assets/startmusic.mp3";
import ReactHowler from "react-howler";

const clickAudio = new Audio(click);
clickAudio.volume = 0.3;

const initialBgmOn = JSON.parse(localStorage.getItem("bgm-on"));

function BGMToggle({ status }) {
  const [isBGMOn, setIsBGMOn] = useState(
    initialBgmOn === null ? true : initialBgmOn
  );

  const imgName = isBGMOn ? "music-on-symbol" : "music-off-symbol";

  return (
    <>
      <ReactHowler
        src={openingGOT}
        volume={0.2}
        loop
        playing={isBGMOn && status !== "win"}
      />

      {status === "win" && (
        <ReactHowler src={victoryGOT} volume={0.2} loop playing={isBGMOn} />
      )}

      {status === "lose" && (
        <ReactHowler src={defeatGOT} volume={0.2} loop playing={isBGMOn} />
      )}

      <button
        className="bgm-toggle"
        onClick={() => {
          playAudio(clickAudio);

          const newIsBGMOn = !isBGMOn;
          localStorage.setItem("bgm-on", newIsBGMOn);
          setIsBGMOn(newIsBGMOn);
        }}
      >
        <img src={`/${imgName}.svg`} alt={imgName} />
      </button>
    </>
  );
}

export default memo(BGMToggle);
