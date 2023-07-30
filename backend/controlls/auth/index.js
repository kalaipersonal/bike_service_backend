import express from 'express';
import { SellerLogin, SellerRegister, Updateprofile, getCurrentuser } from './Seller_controll.js';


const authRouting = express.Router();

authRouting.post("/register", SellerRegister);
authRouting.post("/login", SellerLogin);
authRouting.post("/currentuser", getCurrentuser);
authRouting.put("/update/:id", Updateprofile);


export default authRouting;