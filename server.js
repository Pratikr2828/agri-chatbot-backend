import express from "express";
import cors from "cors";
import { mis_bot } from "./config/db.js";
import initModels from "./models/init-models.js";
import crop_area_data from "./models/crop_area_data.js";
import handleChat from "./services/chat.service.js";
import { connectRedis } from "./services/cache.service.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DB models
initModels(mis_bot);

/* ===============================
   CHAT API
================================ */

app.post("/api/chat", async (req, res) => {
  const { message, user_lgd } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Message is required"
    });
  }

  try {
    const reply = await handleChat(message, user_lgd);

    res.json({
      success: true,
      reply
    });

  } catch (err) {
    console.error("❌ Chat processing error:", err);

    res.status(500).json({
      success: false,
      error: "Chat processing failed"
    });
  }
});

/* ===============================
   TEST DB API
================================ */

app.get("/api/chat", async (req, res) => {
  try {
    const totalData = await crop_area_data.findAll({
      limit: 10,
      order: [["year", "DESC"]],
      raw: true
    });

    console.log("DB Data:", totalData);

    res.json({
      success: true,
      data: totalData
    });

  } catch (error) {
    console.error("DB Fetch Error:", error);

    res.status(500).json({
      success: false,
      error: "Database fetch failed"
    });
  }
});

/* ===============================
   START SERVER
================================ */

async function startServer() {
  try {

    // Connect Redis
    await connectRedis();

    console.log("✅ Redis connection established");

    // Test DB connection
    await mis_bot.authenticate();

    console.log("✅ PostgreSQL connected");

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
    });

  } catch (err) {

    console.error("❌ Server startup failed:", err);

    process.exit(1);
  }
}

startServer();