import redis from "redis";
import fs from "fs";

// Load config
const config = JSON.parse(
  fs.readFileSync("config/config.json", "utf-8")
);

const redisConfig = config.redis_cache_db;

// Create Redis client
const client = redis.createClient({
  socket: {
    host: redisConfig.host,
    port: redisConfig.port,
    reconnectStrategy: (retries) => {
      console.log(`Redis reconnect attempt #${retries}`);
      return Math.min(retries * 100, 3000);
    }
  },
  username: redisConfig.user || undefined,
  password: redisConfig.password || undefined
});

// Redis events
client.on("connect", () => {
  console.log("✅ Redis connected");
});

client.on("ready", () => {
  console.log("🚀 Redis ready for operations");
});

client.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

client.on("end", () => {
  console.log("⚠️ Redis connection closed");
});

// Connect function
async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}

export { client as redisClient, connectRedis };