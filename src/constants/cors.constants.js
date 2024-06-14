const config = require("../config");
const environments = require("./index");

const localAllowedOrigns = ["http://localhost:8080"];
const devAllowedOrigns = ["http://localhost:8081"];
const prodAllowedOrigns = ["https://empty.com"];

const localAllowedMethods = ["POST","OPTIONS"];
const devAllowedMethods = ["POST","OPTIONS"];
const prodAllowedMethods = ["POST","OPTIONS"];

const getAllowedOrigins = () => {
  switch (config.server.ENV) {
    case environments.PROD:
      return prodAllowedOrigns;
    case environments.DEV:
      return devAllowedOrigns;
    case environments.LOCAL:
      return localAllowedOrigns;
    default:
      return [];
  }
};

const getAllowedMethods = () => {
  switch (config.server.ENV) {
    case environments.PROD:
      return prodAllowedMethods;
    case environments.DEV:
      return devAllowedMethods;
    case environments.LOCAL:
      return localAllowedMethods;
    default:
      return [];
  }
};


module.exports = {
  getAllowedOrigins,
  getAllowedMethods,
};
