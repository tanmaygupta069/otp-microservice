const { getServerHealthInfo, testApiService } = require("../services");

const getServerHealthInfoController = (_, res) => {
  const result = getServerHealthInfo();
  return res.status(200).json(result);
};

const testApiController = (req, res) => {
  const result = testApiService();
  return res.status(200).json(result);
};

module.exports = { getServerHealthInfoController, testApiController };
