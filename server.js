const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const stringSimilarity = require("string-similarity");
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY

app.use(cors());
app.use(express.json());

app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt, num_images, size } = req.body;
    console.log(prompt);
    const openaiResponse = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "image-alpha-001",
        prompt,
        num_images,
        size: `${size[0]}x${size[1]}`, // Convert the size array to a string in the format "256x256"
        response_format: "url",
      }),
    });

    if (!openaiResponse.ok) {
      console.error("Response received from OpenAI API:", openaiResponse);
      const errorResponse = await openaiResponse.json();
      console.error("Error response JSON:", errorResponse);
      res.status(500).json({ error: "Failed to fetch image" });
    } else {
      const data = await openaiResponse.json();
      res.json(data);
    }
  } catch (error) {
    console.error("Error occurred during the request:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

app.post("/api/generate-text", async (req, res) => {
  try {
    const { prompt, length, temperature, max_tokens } = req.body;

    const openaiResponse = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        max_tokens,
        n: length,
        temperature,
      }),
    });

    if (!openaiResponse.ok) {
      console.error("Response received from OpenAI API:", openaiResponse);
      const errorResponse = await openaiResponse.json();
      console.error("Error response JSON:", errorResponse);
      res.status(500).json({ error: "Failed to generate text" });
    } else {
      const data = await openaiResponse.json();
      res.json(data.choices[0].text);
    }
  } catch (error) {
    console.error("Error occurred during the request:", error);
    res.status(500).json({ error: "Failed to generate text", message: error.message });
  }
});

app.get("/api/models", async (req, res) => {
  try {
      const modelsResponse = await fetch("https://api.openai.com/v1/models", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
    });

    if (!modelsResponse.ok) {
      console.error("Response received from OpenAI API:", modelsResponse);
      const errorResponse = await modelsResponse.json();
      console.error("Error response JSON:", errorResponse);
      res.status(500).json({ error: "Failed to fetch models" });
    } else {
      const data = await modelsResponse.json();
      res.json(data.data);
    }
  } catch (error) {
    console.error("Error occurred during the request:", error);
    res.status(500).json({ error: "Failed to fetch models", message: error.message });
  }
});

app.post("/api/calculate-score", (req, res) => {
  try {
    const { prompt, guess } = req.body;

    // Calculate the similarity score between the prompt and the guess using the string-similarity package
    const score = Math.round(stringSimilarity.compareTwoStrings(prompt, guess) * 5000);

    res.json({ score });
  } catch (error) {
    console.error("Error occurred during the request:", error);
    res.status(500).json({ error: "Failed to calculate score", message: error.message });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages, model } = req.body;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages,
      }),
    });

    if (!openaiResponse.ok) {
      console.error("Response received from OpenAI API:", openaiResponse);
      const errorResponse = await openaiResponse.json();
      console.error("Error response JSON:", errorResponse);
      res.status(500).json({ error: "Failed to chat" });
    } else {
      const data = await openaiResponse.json();
      res.json(data);
    }
  } catch (error) {
    console.error("Error occurred during the request:", error);
    res.status(500).json({ error: "Failed to chat" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});