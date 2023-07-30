import express from 'express';

import { AdminLogin, AdminRegister, getAdminCurrentuser } from './Admin_controll.js';


const authadminRouting = express.Router();

authadminRouting.post("/register", AdminRegister);
authadminRouting.post("/login", AdminLogin);
authadminRouting.post("/currentuser", getAdminCurrentuser);

export default authadminRouting;