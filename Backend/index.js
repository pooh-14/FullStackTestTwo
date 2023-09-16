import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { Login, Register } from "./Controllers/User.controller.js";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req,res)=>{
    res.send("Working");
})

app.post("/register", Register)

app.post("/login", Login)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to MongoDB!');
})

app.listen(6000, (req,res)=>{
    console.log("Server listening on port 6000!");
})


