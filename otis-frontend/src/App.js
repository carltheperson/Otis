import React from 'react';
import './App.css';

// Components
import Terminal from "./Components/Terminal";

function App() {
  return (
    <div className="App">
      <Terminal width="50%" height="500px" options={
        [{1: "Create a new adventure"},
        {2: "Work on an existing adventure"},
        {3: "About Otis"}]}>
          To continue, select from the menu:
        </Terminal>
    </div>
  );
}

export default App;
