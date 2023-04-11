const fetch = require("node-fetch");

(async () => {
  try {
    const response = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "Tell me a joke.",
          },
        ],
      }),
    });

    const data = await response.json();
  } catch (error) {
    console.error("Error sending test request:", error);
  }
})();

test('Test /api/chat route', async () => {
  try {
    const response = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "Tell me a joke.",
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("Chat response:", data);
    expect(data).toHaveProperty('messages');
    expect(data.messages[0]).toHaveProperty('role', 'assistant');
    expect(data.messages[0]).toHaveProperty('content');
  } catch (error) {
    console.error("Error sending test request:", error);
  }
});
