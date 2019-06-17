import React from "react";
import PickOne from "./components/PickOne/PickOne";
import PromptScreen from "./components/PromptScreen/PromptScreen";
import Savior from "./components/Savior/Savior";
import { Router } from "@reach/router";
import Auth from "./components/Auth/Auth";

function App() {
  return (
    <div className="App">
      <Router>
        <PickOne path="/" />
        <PromptScreen path="/prompter" />
        <Savior path="/savior" />
        <Auth path="/signin" />
      </Router>
    </div>
  );
}

export default App;
