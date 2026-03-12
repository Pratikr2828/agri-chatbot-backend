import { mis_bot } from "../config/db.js";
import initModels from "./init-models.js";

// Initialize all models
const db = initModels(mis_bot);

// Attach sequelize instance
db.sequelize = mis_bot;

export default db;
