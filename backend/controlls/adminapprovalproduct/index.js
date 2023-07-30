import express from 'express';
import { ApprovalProduct, ApprovalProductStatus, ApprovalProductStatusRejected } from './Adminapproval.js';



const approvalauthrouting = express.Router();

approvalauthrouting.post("/allproducts", ApprovalProduct);
approvalauthrouting.put("/approval/:id", ApprovalProductStatus);
approvalauthrouting.put("/approvalreject/:id", ApprovalProductStatusRejected);

// authRouting.post("/currentuser", getCurrentuser);

export default approvalauthrouting;