const cors = require("cors");
const {
  getAllowedOrigins,
  getAllowedMethods,
} = require("../constants/cors.constants");

const corsOptions = {
  origin: getAllowedOrigins(),
  methods: getAllowedMethods(),
};

module.exports = cors(corsOptions);
