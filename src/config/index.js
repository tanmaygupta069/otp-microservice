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
    mysql: {
      HOST: process.env.SQL_HOST,
      USER: process.env.SQL_USER,
      PASSWORD: process.env.SQL_PASSWORD,
    },
    dynamoDb: {
      ENDPOINT: process.env.DYNAMO_ENDPOINT,
      REGION: process.env.DYNAMO_REGION,
      ACCESS_KEY_ID: process.env.DYNAMO_ACCESS_KEY_ID,
      SECRET_ACCESS_KEY_ID: process.env.DYNAMO_SECRET_ACCESS_KEY_ID,
      PORT: process.env.DYNAMO_PORT,
    },
    nodeMailer: {
      HOST: process.env.NODEMAILER_HOST,
      PORT: process.env.NODEMAILER_PORT,
      USER: process.env.NODEMAILER_USER,
      PASS: process.env.NODEMAILER_PASS,
    },
    rateLimit: {
      STANDARD_HEADERS: process.env.STANDARD_HEADERS,
      GENERATE_API_LIMIT_PER_MIN: process.env.GENERATE_API_LIMIT_PER_MIN,
      VALIDATE_API_LIMIT_PER_MIN: process.env.VALIDATE_API_LIMIT_PER_MIN,
    },
    otpConfig: {
      EXPIRY: process.env.EXPIRY,
    },
  });
};

module.exports = getConfig();
