import "../styles/Header.css";

export default function Header({ children, onQuit }) {
  return (
    <header className="header">
      <h1>
        <button onClick={onQuit} className="logo-button">
          <img
            src={`./Mediamodifier-Design1.svg`}
            alt="logo"
            className="logo"
          />
          <div className="dragonDiv">
            <span className="dragonHead">House of The Dragon</span>
            <span className="dragonTitle">The Memory Conquest</span>
          </div>{" "}
          <img
            src={`./Mediamodifier-Design1.svg`}
            alt="logo"
            className="logo"
          />
        </button>
      </h1>
      {children}
    </header>
  );
}
