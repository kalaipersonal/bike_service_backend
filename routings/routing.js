import express from 'express';
import adminroutings from '../controlls/admin/index.js';
import sellerroutings from '../controlls/seller/index.js';




const adminrouting = express.Router();

// admin
adminrouting.use("/auth/admin",adminroutings)

// seller
adminrouting.use("/auth/seller",sellerroutings)



export default adminrouting;