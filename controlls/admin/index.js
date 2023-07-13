import express from 'express';
import { AuthRegister } from './auth_controll.js';



const adminroutings = express.Router();

adminroutings.post("/register",AuthRegister)


export default adminroutings;