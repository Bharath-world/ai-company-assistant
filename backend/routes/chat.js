import express from "express";
import { askAI } from "../services/aiService.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  const reply = await askAI(message);

  res.json({ reply });
});

export default router;
