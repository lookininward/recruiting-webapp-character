import "./App.css";
import { useReducer, useCallback, useEffect } from "react";
import Topbar from "./components/topbar";
import AttributeControls from "./components/AttributeControls";
import ClassList from "./components/ClassList";
import SkillControls from "./components/SkillControls";
import SkillCheck from "./components/SkillCheck";
import { REQ_URL } from "./consts";
import { newCharacter } from "./utils";

function App() {
  const partyReducer = (state, action) => {
    switch (action.type) {
      case "SET_GAME_STATE":
        return {
          ...state,
          ...action.payload,
        };
      case "ADD_CHARACTER":
        return {
          ...state,
          [action.payload.id]: action.payload,
        };
      case "UPDATE_CHARACTER_ATTRIBUTES":
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            attributes: action.payload.attributes,
          },
        };
      case "UPDATE_CHARACTER_SKILLS":
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            skills: action.payload.skills,
          },
        };
      default:
        return state;
    }
  };

  const [characters, dispatch] = useReducer(partyReducer, {});
  const numCharacters = Object.keys(characters).length;

  const onClickAddCharacter = useCallback(() => {
    dispatch({
      type: "ADD_CHARACTER",
      payload: newCharacter(),
    });
  }, [dispatch]);

  const onUpdateCharacterAttrs = useCallback(
    (id, attrs) => {
      dispatch({
        type: "UPDATE_CHARACTER_ATTRIBUTES",
        payload: { id, attributes: attrs },
      });
    },
    [dispatch]
  );

  const onUpdateCharacterSkills = useCallback(
    (id, skills) => {
      dispatch({
        type: "UPDATE_CHARACTER_SKILLS",
        payload: { id, skills },
      });
    },
    [dispatch]
  );

  const saveGame = async () => {
    try {
      const response = await fetch(REQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characters),
      });
      const data = await response.json();
      console.log("saveGame success", data);
    } catch (error) {
      console.error("saveGame fail", error);
    }
  };

  const getGame = async () => {
    try {
      const response = await fetch(REQ_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { body } = await response.json();
      console.log("getGame success", body);
      // todo: parse and set the characters to the game state
      // dispatch({
      //   type: "SET_GAME_STATE",
      //   payload: body,
      // });
    } catch (error) {
      console.error("getGame fail", error);
    }
  };

  // on initial load, get the game state and set it to the characters
  useEffect(() => {
    getGame();
    // todo: set the characters to the game state
    // todo: don't add initial character if there are already characters
    // todo: ability to reset the game state
    // todo: if no game state, add initial character newCharacter()
  }, []);

  // console.log("characters", characters);

  return (
    <div className="App">
      <Topbar
        numCharacters={numCharacters}
        onClickAddCharacter={onClickAddCharacter}
        onClickSaveGame={saveGame}
      />
      {numCharacters > 1 && <SkillCheck characters={characters} />}
      {Object.values(characters)?.map((character) => (
        <section key={character.id} className="character">
          <h2 className="character__header">Character: {character.id}</h2>
          <SkillCheck
            attributes={character.attributes}
            skills={character.skills}
          />
          <div className="character__body">
            <AttributeControls
              attributes={character.attributes}
              setAttributes={(attrs) =>
                onUpdateCharacterAttrs(character.id, attrs)
              }
            />
            <ClassList attributes={character.attributes} />
            <SkillControls
              attributes={character.attributes}
              skills={character.skills}
              setSkills={(skills) =>
                onUpdateCharacterSkills(character.id, skills)
              }
            />
          </div>
        </section>
      ))}
    </div>
  );
}

export default App;
