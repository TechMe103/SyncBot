import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
//createserver is userd to create http server -> to connect socket.io with express
import { createServer } from "node:http";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectToSocket from "./controllers/socketManager.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit: "50kb"}));
app.use(express.urlencoded({ extended: true , limit: "50kb"}));
const server = createServer(app);
// const io = new Server(server);
const io = connectToSocket(server);


app.set("port" , process.env.PORT || 8000);
app.get("/", (req, res) => {
  res.send("SyncMeet Backend is running");
});

const start = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");

        server.listen(app.get("port"), () => {
            console.log(`Server is running on port ${app.get("port")}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
        }
    };

start();