const config = require("./src/config");
const app = require("./src/server");


process.on("unhandledRejection", (err) => {
  console.error("unhandled rejection error: ", err);
});
process.on("uncaughtException", (err) => {
  console.error("uncaught exception error: ", err);
});

app.listen(config.server.PORT, (err) => {
  if (err) {
    console.log(`error starting server at port ${config.server.PORT}`);
  } else {
    console.log(`server is listening at port ${config.server.PORT}`);
  }
});