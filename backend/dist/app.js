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

// Handle preflight requests
app.options("*", (0, _cors.default)());
app.use((0, _cors.default)({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    const allowedOrigins = ["https://meet2meet.netlify.app", "http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"];

    // Check if the origin is in our allowed list or if it's a Netlify deploy preview
    if (allowedOrigins.includes(origin) || origin.includes("netlify.app")) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));
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