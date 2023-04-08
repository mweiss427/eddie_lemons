import React, { useState } from "react";
import "./App.css";
import ModelList from "./components/ModelList";
import ImageGenerator from "./components/ImageGenerator";

function App() {
  const [showModelList, setShowModelList] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [showImageGenerator, setShowImageGenerator] = useState(false);

  const handleChat = async () => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: chatInput }],
          model: "gpt-3.5-turbo",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to chat");
      }

      const data = await response.json();
      setChatResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("Error during chat request:", error);
    }
  };

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
      <div>
        <label>
          Prompt:
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Enter chat prompt"
          />
        </label>
        <button onClick={handleChat}>Chat</button>
      </div>
      <p>{chatResponse}</p>
    </div>
  );
}

export default App;
