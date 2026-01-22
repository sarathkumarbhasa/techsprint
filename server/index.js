import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/ai/find-collaborators", async (req, res) => {
  const { query, availableUsers } = req.body;

  const prompt = `
Context: You are the matching engine for 'CollabSpace', a university networking app.
Request: The user is looking for collaborators with this description: "${query}".
Available Pool: ${JSON.stringify(availableUsers)}

Task: Identify the top 3 users from the available pool who best match the request.
Rules:
1. Calculate a matchPercentage (0-100) based on skills, year, and interests.
2. Provide a 'friendlyIntro' explaining why they were picked.
3. If no good matches exist, return an empty array.
`;

  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
  });

  res.json(JSON.parse(response.text));
});

app.listen(5000, () => {
  console.log("Gemini API server running on http://localhost:5000");
});
