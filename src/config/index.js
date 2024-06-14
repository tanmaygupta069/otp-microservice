require("dotenv").config();
const { environments } = require("../constants");

const getConfig = () => {
  if (environments[process.env.ENV] == undefined) {
    throw new Error(`invalid env: ${process.env.ENV}`);
  }
  return Object.freeze({
    server: {
      PORT: process.env.PORT,
      ENV: process.env.ENV,
      DOMAIN_URL: process.env.DOMAIN_URL,
    },
    redis: {
      HOST: process.env.REDIS_HOST,
      PORT: process.env.REDIS_PORT,
      USER: process.env.REDIS_USER,
      PASSWORD: process.env.REDIS_PASSWORD,
    },
    rateLimit: {
      
    },
  });
};

module.exports = getConfig();
