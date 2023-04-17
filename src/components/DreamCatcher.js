import React, { useState } from "react";
import "./DreamCatcher.css";

function DreamCatcher() {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to start a new conversation in the database and interact with AI
  };

  return (
    <div className="DreamCatcher">
      <h2>Dream Catcher</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="DreamCatcher-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your dream here..."
        />
        <button type="submit">Submit</button>
      </form>
      {/* Chat feature and list of previous conversations/sub-tabs go here */}
    </div>
  );
}

export default DreamCatcher;
