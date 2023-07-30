import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDb from './dbconnect/Dbconnect.js';
import commonrouting from './routing.js';
dotenv.config();
ConnectDb();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/bikewash", commonrouting)
app.listen(process.env.PORT, () => {
    console.log(`Port Running ${process.env.PORT}`)
})