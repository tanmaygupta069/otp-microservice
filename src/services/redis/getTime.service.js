const { getRedisClient } = require("../../database/redis");

const checkTime = async (key) => {
  const client = await getRedisClient();
  let timeStamp;
  try {
    timeStamp = await client.hGet(key,"TIMESTAMP");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  return timeStamp;
};

module.exports = checkTime;