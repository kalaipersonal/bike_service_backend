import express from 'express';
import { Allordersbooking, createbooking } from './Orderdetails_controll.js';



const orderrouting = express.Router();

orderrouting.post("/create", createbooking);
orderrouting.post("/userorders", Allordersbooking);
// authRoutingProduct.get("/getsingledata/:id", GetSingleproduct);
// authRoutingProduct.put("/update/:id", UpdateSingleproduct);
// authRoutingProduct.delete("/delete/:id", Deleteproduct);






export default orderrouting;