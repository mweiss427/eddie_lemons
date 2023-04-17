import React, { useState } from "react";
import "./CodingHelper.css";

function CodingHelper() {
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState([]);
  const [aiCodeSuggestions, setAiCodeSuggestions] = useState("");
  const [responseDump, setResponseDump] = useState("");

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/coding-helper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, code }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        console.log("Coding helper entry saved successfully");
        console.log("result:", result);
        // Directly set the JSON response to the aiCodeSuggestions state
        setAiCodeSuggestions(JSON.stringify(result, null, 2));
        setResponseDump(JSON.stringify(result.chatResponse, null, 2));
        setPrompt("");
      } else {
        console.error("Error saving coding helper entry");
      }
    } catch (err) {
      console.error("Error saving coding helper entry:", err);
    }
  };  

  return (
    <div className="CodingHelper">
      <div className="CodingHelper-header">
        <h2>Eddie Lemons - Writes the most secure code possible.</h2>
      </div>
      <textarea
        className="CodingHelper-aiCodeSuggestions"
        value={aiCodeSuggestions}
        readOnly
        placeholder="AI code suggestions will appear here..."
      />
      <textarea
        className="ResponseDump"
        value={responseDump}
        readOnly
        placeholder="The entire chatResponse object will appear here..."
      />
      <div className="CodingHelper-dialog">
        {messages.map((message, index) => (
          <pre key={index} className={`CodingHelper-message ${message.role}`}>
            {message.content}
          </pre>
        ))}
      </div>
      <textarea
        className="CodingHelper-prompt"
        value={prompt}
        onChange={handlePromptChange}
        placeholder="Type your prompt here..."
      />
      <textarea
        className="CodingHelper-code"
        value={code}
        onChange={handleCodeChange}
        placeholder="Type your code here..."
      />
      <button className="CodingHelper-submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default CodingHelper;
