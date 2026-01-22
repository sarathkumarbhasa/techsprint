import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini (Vercel will inject env vars)
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// Reuse the same logic as server/index.js
app.post("/ai/find-collaborators", async (req, res) => {
    try {
        const { query, availableUsers } = req.body;

        // Safety check for keys
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ error: "Missing Gemini API Key" });
        }

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

        res.json(JSON.parse(response.text()));
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.post("/ai/build-team", async (req, res) => {
    // Add Placeholder for other routes if needed, or implement them similar to above
    res.status(501).json({ error: "Not implemented in API adapter yet" });
});

// Vercel Serverless Entry Point
export default app;
