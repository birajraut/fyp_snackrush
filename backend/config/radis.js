const redis = require('redis');

// Create a global variable to hold the Redis client instance
let redisClient = null;

// Function to connect to Redis once
const radisClient = async () => {
  if (redisClient) return redisClient; // If Redis client is already connected, return the instance

  redisClient = redis.createClient({
    url: 'redis://127.0.0.1:6379',  // Default Redis URL
  });

  redisClient.on('error', (err) => console.error('Redis Error:', err));

  try {
    await redisClient.connect();  // Connect to Redis
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }

  return redisClient;
};

module.exports = { radisClient };

