import express from 'express';
import adminroutings from '../controlls/admin/index.js';




const adminrouting = express.Router();

adminrouting.use("/auth/admin",adminroutings)


export default adminrouting;