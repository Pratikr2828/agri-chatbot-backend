import express from "express";
import cors from "cors";
import { mis_bot } from "./config/db.js";
import initModels from "./models/init-models.js";
import crop_area_data from "./models/crop_area_data.js";
import handleChat from './services/chat.service.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

//db connection
initModels(mis_bot);

// 🔥 CHAT API
app.post("/api/chat", async (req, res) => {
    const { message, user_lgd } = req.body;
    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    try {
        const reply = await handleChat(message, user_lgd);
        res.json({ reply });
    } catch (err) {
        console.log("Ollama error", err)
        res.status(500).json({ error: "Ollama error" });
    }
});

app.get("/api/chat", async (req, res) => {
    try {
        const totalData = await crop_area_data.findAll({
            limit: 10,
            order: [['year', 'DESC']],
            raw: true
        });

        console.log("DB Data:", totalData);
    } catch (error) {
        console.error("DB Fetch Error:", error);
    }
})

app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
});
