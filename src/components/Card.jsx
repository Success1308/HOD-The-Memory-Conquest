import { useEffect, useState } from "react";
import "../styles/Card.css";
import Tilt from "react-parallax-tilt";

export default function Card({ card, onClick, cardsShowing }) {
  const ANIMATION_TIME = 850;
  const [interactable, setInteractable] = useState(false);

  useEffect(() => {
    setTimeout(() => setInteractable(true), ANIMATION_TIME);
  }, []);

  return (
    <Tilt
      tiltReverse
      reset
      glareEnable={true}
      glareMaxOpacity={0.2}
      glareColor="#fff"
      glarePosition="all"
      className={`card-container ${cardsShowing ? "front" : "back"} ${
        cardsShowing && interactable ? undefined : "pointer-events-none"
      }`}
    >
      <div className="card-inner">
        <div className="card-front">
          <button className="card" onClick={onClick}>
            <img
              src={card.image}
              alt={card.name}
              className="card-image"
              draggable="false"
            />
            <div className="card-details">
              <p className="card-name">{card.name.split(" ")[0]}</p>
              {card.house !== "None" && (
                <p className="card-house">{card.house}</p>
              )}
              <p className="card-title">{card.title}</p>
            </div>
          </button>
        </div>
        <div className="card-back">
          <img src={`/card-back.jpg`} alt="Card back" className="back" />
        </div>
      </div>
    </Tilt>
  );
}
