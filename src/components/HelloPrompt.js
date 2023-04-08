import React, { useState } from "react";

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
      setChatResponse(data.choices[0].message.content);
    } catch (error) {
      console.error("Error during chat request:", error);
    }
  };

  return (
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
      <p>{chatResponse}</p>
    </div>
  );
};

export default HelloPrompt;
