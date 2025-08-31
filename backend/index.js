// backend/index.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import explainRoute from "./routes/explain.js"; // ES Module import

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/explain", explainRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
