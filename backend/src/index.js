import express from "express";
import {createServer} from "node:http";

import mongoose from "mongoose";

import cors from "cors";
import connectToSocket from "./controllers/socket.js";

import userRoutes from "./routes/userRoutes.js";

const mongoUrl = 'mongodb+srv://donbasty375:3j5LoEsmMJ6L7S2b@cluster0.rk2gj.mongodb.net/';

const app = express();

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({extended:"true",limit:"40kb"}));

app.use("/api/v1/users",userRoutes);

const server = createServer(app);
const io = connectToSocket(server);

app.get("/",(req,res)=>{
    return res.json({"hello": "world"})
})

const mongodb = await mongoose.connect(mongoUrl);

console.log(`Database connected .. ${mongodb.connection.host}`)

server.listen(8000 , ()=>{
     console.log(`Listening to port 8000 `);
})