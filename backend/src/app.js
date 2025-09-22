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

// Handle preflight requests
app.options("*", cors());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "https://meet2meet.netlify.app",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
      ];

      // Check if the origin is in our allowed list or if it's a Netlify deploy preview
      if (allowedOrigins.includes(origin) || origin.includes("netlify.app")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
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
