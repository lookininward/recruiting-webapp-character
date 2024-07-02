import "./App.css";
import { useMemo, useReducer, useCallback } from "react";
import Topbar from "./components/topbar";
import AttributeControls from "./components/AttributeControls";
import ClassList from "./components/ClassList";
import { ATTRIBUTE_LIST, SKILL_LIST } from "./consts";

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

  console.log("characters", characters);

  return (
    <div className="App">
      <Topbar
        numCharacters={numCharacters}
        onClickAddCharacter={onClickAddCharacter}
        onClickSaveGame={() => console.log("Save game")}
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
            <div>Skills</div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default App;
