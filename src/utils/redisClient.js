const redis = require("redis");

const redisClient = redis.createClient({
  url: "redis://localhost:6379",
});

const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Redis connected successfully");
    }
  } catch (err) {
    console.error("Redis connection error:", err);
  }
};

module.exports = {
  redisClient,
  connectRedis,
};
