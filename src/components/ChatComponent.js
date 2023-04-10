import React, { useState, useEffect } from "react";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchConversation() {
      try {
        const response = await fetch("/api/conversation");
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error("Failed to fetch conversation:", error);
      }
    }
    fetchConversation();
  }, []);

  return (
    <div>
      <h2>Chat History</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>{message.role}: </strong>
            {message.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatComponent;
