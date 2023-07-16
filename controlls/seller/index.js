import express from 'express';
import { AuthRegister } from './auth_controll.js';



const sellerroutings = express.Router();

sellerroutings.post("/register",AuthRegister)


export default sellerroutings;