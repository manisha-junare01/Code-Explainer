import express from "express";
import { Ollama } from "ollama";  // Named import for Ollama

const router = express.Router();

router.post("/", async (req, res) => {
  const { code } = req.body;
  console.log("Received code:", code); // Add logging
  if (!code) return res.status(400).json({ error: "Code input is required!" });

  try {
    const prompt = `Explain the following code step by step in simple English. Break down what each line does and what the overall purpose is:\n\n${code}`;
    console.log("Sending prompt to Ollama..."); // Add logging

    // Create Ollama instance
    const ollama = new Ollama();
    
    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 30000) // 30 second timeout
    );
    
    // Ollama chat call with correct model name and response structure
    const response = await Promise.race([
      ollama.chat({
        model: "qwen2:0.5b",  // Smallest model (352MB) - should be fastest
        messages: [
          { role: "system", content: "You are a helpful assistant that explains code." },
          { role: "user", content: prompt }
        ]
      }),
      timeoutPromise
    ]);

    // Ollama response structure - response.message.content is correct
    console.log("Ollama response:", response); // Add logging
    console.log("Sending response to frontend:", response.message.content); // Add logging
    res.json({ explanation: response.message.content });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error generating explanation" });
  }
});

export default router;