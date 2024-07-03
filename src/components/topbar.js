import { memo } from "react";

const Topbar = memo(
  ({ numCharacters, onClickAddCharacter, onClickSaveGame, onClearGame }) => {
    return (
      <div className="topbar">
        <h1>Party of {numCharacters}</h1>
        <div>
          <button onClick={onClickAddCharacter} style={{ marginRight: "1em" }}>
            + New Character
          </button>
          <button onClick={onClickSaveGame} style={{ marginRight: "1em" }}>Save Game</button>
          <button onClick={onClearGame}>Clear Game</button>
        </div>
      </div>
    );
  }
);

export default Topbar;
