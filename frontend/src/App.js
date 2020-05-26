import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';

// Components
import MainPage from "./Components/Pages/MainPage";
import NewAdventure from "./Components/Pages/NewAdventure";
import YourAdventures from "./Components/Pages/YourAdventures";
import Editor from "./Components/Pages/Editor";
import Export from "./Components/Pages/Export";

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
        <Route exact path="/your-adventures">
          <YourAdventures/>
        </Route>
        <Route path="/edit/:id" component={Editor}></Route>
        <Route path="/export/:id" component={Export}></Route>
      </div>
    </Router>
  );
}

export default App;
