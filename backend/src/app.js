import express from "express";
import { createServer } from "node:http";
import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", process.env.PORT || 8000);
app.use(
  cors({
    origin: "*", // or "*" for all origins (not recommended for production)
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const mongoUrl = process.env.DB_URL;
console.log(mongoUrl);
const start = async () => {
  app.set("mongo_user");
  const connectionDb = await mongoose.connect(`${mongoUrl}`);
  console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);
  server.listen(app.get("port"), () => {
    console.log("LISTENING ON PORT 8000");
  });
};

start();
