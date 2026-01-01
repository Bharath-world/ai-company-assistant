import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();

// ✅ REQUIRED FOR RENDER
const PORT = process.env.PORT || 5000;

// config
const OLLAMA_URL = "http://127.0.0.1:11434/api/generate";
const MODEL = "phi3:mini";

app.use(cors());
app.use(express.json());

// health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// main endpoint
app.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.json({ reply: "Please ask something." });
  }

  const prompt = `
You are an AI Company Assistant representing a technology company.

RULES:
- You represent the COMPANY, not yourself
- Never say "I am an AI"
- Speak as "we" or "our company"
- Be friendly and professional

Company Info:
We build AI-powered assistants, automation tools, and internal knowledge systems.
Our mission is to help people and businesses work smarter using AI.

User: ${question}
Assistant:
`;

  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        stream: false
      })
    });

    const data = await response.json();

    res.json({
      reply: data.response?.trim() || "No response from model."
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      reply: "AI service is currently unavailable."
    });
  }
});

// ✅ THIS IS THE MOST IMPORTANT PART
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
