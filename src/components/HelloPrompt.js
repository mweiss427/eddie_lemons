import React, { useState } from "react";
import Conversation from "./Conversation";

const HelloPrompt = () => {
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");

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
      if (data && data.choices && data.choices.length > 0) {
        setChatResponse(data.choices[0].message.content);
      } else {
        console.error("Invalid chat response:", data);
        setChatResponse("Error: Invalid chat response");
      }
    } catch (error) {
      console.error("Error during chat request:", error);
      setChatResponse("Error: Failed to chat");
    }
  };

  return (
    <div>
      <Conversation />
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
  );
};

export default HelloPrompt;
