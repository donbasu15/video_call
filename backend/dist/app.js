"use strict";

var _express = _interopRequireDefault(require("express"));
var _nodeHttp = require("node:http");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _socket = require("socket.io");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _socketManager = require("./controllers/socketManager.js");
var _cors = _interopRequireDefault(require("cors"));
var _usersRoutes = _interopRequireDefault(require("./routes/users.routes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_dotenv.default.config();
const app = (0, _express.default)();
const server = (0, _nodeHttp.createServer)(app);
const io = (0, _socketManager.connectToSocket)(server);
app.set("port", process.env.PORT || 8000);
app.use((0, _cors.default)());
app.use(_express.default.json({
  limit: "40kb"
}));
app.use(_express.default.urlencoded({
  limit: "40kb",
  extended: true
}));
app.use("/api/v1/users", _usersRoutes.default);
const mongoUrl = process.env.DB_URL;
console.log(mongoUrl);
const start = async () => {
  app.set("mongo_user");
  const connectionDb = await _mongoose.default.connect(`${mongoUrl}`);
  console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISTENING ON PORT 8000");
  });
};
start();