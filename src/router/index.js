const express = require("express");
const {
  getServerHealthInfoController,
  testApiController,
} = require("../controllers");
const v1Router = require("./v1");

const router = express.Router();

router.get("/health", getServerHealthInfoController);

router.get("/test", testApiController);

router.use("/v1", v1Router);

module.exports = router;
