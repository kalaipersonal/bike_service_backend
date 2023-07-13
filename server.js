import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from 'cors';
import express from "express";
import morgan from "morgan";
import ConnectDb from "./config/Dbconnect.js";
import adminrouting from "./routings/routing.js";
const app = express();
dotenv.config();
ConnectDb();
app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

// api sections

app.use("/bike",adminrouting);


// app.listen(() => {
//     console.log(`Port Runing ${process.env.PORT}`)
// })

app.listen(process?.env?.PORT, () => {
    console.log(`Port Running ${process?.env?.PORT}`);
})


