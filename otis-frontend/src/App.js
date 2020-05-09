import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

// Components
import MainPage from "./Components/Pages/MainPage";
import NewAdventure from "./Components/Pages/NewAdventure";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/">
          <MainPage/>
        </Route>
        <Route exact path="/new-adventure">
          <NewAdventure/>
        </Route>
      </div>
    </Router>
  );
}

export default App;
