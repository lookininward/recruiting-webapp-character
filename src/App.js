import "./App.css";
import { useMemo, useReducer, useCallback, useEffect } from "react";
import Topbar from "./components/topbar";
import AttributeControls from "./components/AttributeControls";
import ClassList from "./components/ClassList";
import SkillControls from "./components/SkillControls";
import { ATTRIBUTE_LIST, SKILL_LIST, REQ_URL } from "./consts";

export const defaultAttrs = ATTRIBUTE_LIST.reduce(
  (acc, attr) => ({ ...acc, [attr]: 0 }),
  {}
);

export const defaultSkills = SKILL_LIST.reduce((acc, skill) => {
  return {
    ...acc,
    [skill.name]: 0,
  };
}, {});

export const newCharacter = (
  attributes = defaultAttrs,
  skills = defaultSkills
) => ({
  attributes,
  skills,
  id: crypto.randomUUID().toString(),
});

function App() {
  const partyReducer = (state, action) => {
    switch (action.type) {
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

  const initialCharacter = useMemo(() => newCharacter(), []);
  const [characters, dispatch] = useReducer(partyReducer, {
    [initialCharacter.id]: initialCharacter,
  });

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

  console.log("characters", characters);

  const saveGame = async () => {
    try {
      const response = await fetch(REQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characters),
      });
      await response.json();
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
      const data = await response.json();
      // console.log("getGame success", data);
      // todo: parse and set the characters to the game state
    } catch (error) {
      console.error("getGame fail", error);
    }
  };

  // on initial load, get the game state and set it to the characters
  // useEffect(() => {
  //   getGame();
  //   todo: set the characters to the game state
  //   todo: don't add initial character if there are already characters
  // }, []);

  return (
    <div className="App">
      <Topbar
        numCharacters={numCharacters}
        onClickAddCharacter={onClickAddCharacter}
        onClickSaveGame={saveGame}
      />

      {Object.values(characters)?.map((character) => (
        <section key={character.id} className="character">
          <h2 className="character__header">Character: {character.id}</h2>
          <div>Skill Checker</div>
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
