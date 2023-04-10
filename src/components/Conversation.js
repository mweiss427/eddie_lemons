import React, { useState, useEffect } from "react";

const Conversation = () => {
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    // Define a function to fetch the conversation history from the server
    const fetchConversation = async () => {
      try {
        const response = await fetch("/api/conversation");
        const data = await response.json();
        setConversation(data.messages);
      } catch (error) {
        console.error("Error fetching conversation history:", error);
      }
    };

    // Fetch the conversation history initially and then every 5 seconds
    fetchConversation();
    const interval = setInterval(fetchConversation, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const renderMessage = (message, index) => {
    const className = message.role === "user" ? "user-message" : "assistant-message";
    return (
      <div key={index} className={className}>
        <strong>{message.role}: </strong>
        {message.content}
      </div>
    );
  };

  return <div className="conversation">{conversation.map(renderMessage)}</div>;
};

export default Conversation;
