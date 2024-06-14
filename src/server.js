const express = require("express");
const router = require("./router");
const bodyParser = require("body-parser");
const corsMiddleware = require("./middlewares/cors.middleware");

const app = express();

app.use(bodyParser.json());
app.use(corsMiddleware);

app.use("/", router);


module.exports = app;