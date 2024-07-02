import { memo } from "react";

const Topbar = memo(
  ({ numCharacters, onClickAddCharacter, onClickSaveGame }) => {
    return (
      <div className="topbar">
        <h1>Party of {numCharacters}</h1>
        <div>
          <button onClick={onClickAddCharacter} style={{ marginRight: "1em" }}>
            + New Character
          </button>
          <button onClick={onClickSaveGame}>Save Game</button>
        </div>
      </div>
    );
  }
);

export default Topbar;
