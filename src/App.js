import "./App.css";
import Topbar from "./components/topbar";

function App() {
  return (
    <div className="App">
      <Topbar
        numCharacters={3}
        onClickAddCharacter={() => console.log("Add character")}
        onClickSaveGame={() => console.log("Save game")}
      />
    </div>
  );
}

export default App;
