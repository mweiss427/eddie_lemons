import React, { useState } from "react";
import "./App.css";
import ModelList from "./components/ModelList";
import ImageGenerator from "./components/ImageGenerator";
import HelloPrompt from "./components/HelloPrompt";
import ChatComponent from "./components/ChatComponent";

function App() {
  const [showModelList, setShowModelList] = useState(false);
  const [showImageGenerator, setShowImageGenerator] = useState(false);

  return (
    <div className="App">
    <header className="App-header">
      <h1>Eddie Lemons</h1>
    </header>
    <button onClick={() => setShowModelList(!showModelList)}>
      Toggle Model List
    </button>
    {showModelList && <ModelList />}
    <button onClick={() => setShowImageGenerator(!showImageGenerator)}>
      {showImageGenerator ? "Hide Image Generator" : "Show Image Generator"}
    </button>
    {showImageGenerator && <ImageGenerator />}
    <HelloPrompt />
  </div>
  );
}

export default App;
