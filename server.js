const fetch = require("node-fetch");
const express = require("express");
const cors = require("cors");
const stringSimilarity = require("string-similarity");
const fs = require("fs");
const path = require("path");
const { ObjectId } = require("mongodb");
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY
const conversationFilePath = path.join(__dirname, "conversations.json");
const mongoose = require('mongoose');
const Conversation = require('./src/models/conversation.js');
const Goal = require("./src/models/goal.js");



app.use(cors());
app.use(express.json());


const connectionString = 'mongodb://localhost:27017/eddieLemons';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to the database!');
});

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Eddie Lemons!');
});

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

app.post("/api/prompt", async (req, res) => {
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

app.post("/api/chat", async (req, res) => {
  const rawConversations = fs.readFileSync(conversationFilePath);
  const conversations = JSON.parse(rawConversations);

  const userMessage = {
    role: "user",
    content: req.body.messages[0].content,
  };
  conversations.messages.push(userMessage);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: conversations.messages,
      temperature: 0,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    }),
  });

  const chatResponse = await response.json();

  // Extract the generated response and format it as an assistant message
  console.log("Chat response:", chatResponse);
  const assistantMessage = {
    role: "assistant",
    content: chatResponse.choices[0].message.content.trim(),
  };

  // Add the assistant message to the conversation history and save it
  conversations.messages.push(assistantMessage);
  fs.writeFileSync(conversationFilePath, JSON.stringify(conversations));

  // Save conversation to the database
  const newConversation = new Conversation({ messages: conversations.messages });
  try {
    const savedConversation = await newConversation.save();
    console.log('Conversation saved:', savedConversation);
  } catch (err) {
    console.error('Error saving conversation:', err);
  }  

  // Send the assistant message back as the response
  res.json({ messages: [assistantMessage] });
});

app.get("/api/conversation", (req, res) => {
  try {
    const rawConversations = fs.readFileSync(conversationFilePath);
    const conversations = JSON.parse(rawConversations);
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error reading conversation history:", error);
    res.status(500).json({ error: "Failed to fetch conversation" });
  }
});

app.post("/api/coding-helper", async (req, res) => {
  const { prompt, code } = req.body;
  const currentDate = new Date();
  const dateString = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;

  const codingEntry = {
    date: dateString,
    prompt,
    code,
  };

  try {
    const savedCodingEntry = await new CodingHelperEntry(codingEntry).save();
    console.log("Coding helper entry saved:", savedCodingEntry);

    console.log("Prompt:", prompt);
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an AI React expert code assistant with a security mindset that helps users with their code projects, providing suggestions and improvements. Your response should be in json format and have a response: and codeResponse: variable." },
          { role: "user", content: `I have this code:\n${code}\nPlease analyze the code and provide specific code suggestions or improvements, with a focus on security best practices and correcting any errors. Please provide a secure and well-structured React code example that demonstrates authentication and authorization using the latest best practices, including the use of React hooks, React context, and third-party libraries like react-query for data fetching. Additionally, please include relevant explanations and comments to help understand the rationale behind each step or decision made in the code.` },
        ],                   
        temperature: 0,
        max_tokens: 3000,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
      }),
    });
    

    if (!openaiResponse.ok) {
      console.error("Response received from OpenAI API:", openaiResponse);
      const errorResponse = await openaiResponse.json();
      console.error("Error response JSON:", errorResponse);
      res.status(500).json({ error: "Failed to generate response" });
    } else {
      const chatResponse = await openaiResponse.json();
      console.log("Chat response:", chatResponse);
      const assistantMessage = {
        role: "assistant",
        content: chatResponse.choices[0].message.content.trim(),
      };

      // Split the content into explanation and code
      const [explanation, code] = assistantMessage.content.split("```");
      const assistantCode = code ? code.trim() : '';

      res.json({ success: true, assistantResponse: explanation, assistantCode, chatResponse });
    }
  } catch (err) {
    console.error("Error saving coding helper entry:", err);
    res.status(500).json({ success: false, message: "Error saving coding helper entry" });
  }
});

// CREATE Goal
app.post("/api/goals", async (req, res) => {
  try {
    const goal = new Goal(req.body);
    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    res.status(400).json({ message: "Failed to create goal", error });
  }
});

// READ all Goals
app.get("/api/goals", async (req, res) => {
  try {
    const goals = await Goal.find({});
    res.status(200).json(goals);
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch goals", error });
  }
});

// READ Goal by ID
app.get("/api/goals/:id", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (goal) {
      res.status(200).json(goal);
    } else {
      res.status(404).json({ message: "Goal not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed to fetch goal", error });
  }
});

// UPDATE Goal
app.put("/api/goals/:id", async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedGoal) {
      res.status(200).json(updatedGoal);
    } else {
      res.status(404).json({ message: "Goal not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Failed to update goal", error });
  }
});

// DELETE Goal
app.delete("/api/goals/:id", async (req, res) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    if (deletedGoal) {
      res.status(200).json({ message: "Goal deleted", deletedGoal });
    } else {
      res.status(404).json({ message: "Goal not found" });
    }
  }
  catch (error) {
    res.status(400).json({ message: "Failed to delete goal", error });
  }
});

const codingHelperEntrySchema = new mongoose.Schema({
  date: String,
  prompt: String,
  code: String,
});

const CodingHelperEntry = mongoose.model("CodingHelperEntry", codingHelperEntrySchema);

module.exports = app;