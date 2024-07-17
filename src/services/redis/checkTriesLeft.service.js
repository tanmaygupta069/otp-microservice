const { getRedisClient } = require("../../database/redis");

const checkTriesLeft = async (key) => {
  const client = await getRedisClient();
  let triesLeft;
  try {
    triesLeft = await client.hGet(key,"TRIES");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  return triesLeft;
};

module.exports = checkTriesLeft;
