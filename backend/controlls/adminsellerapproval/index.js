import express from 'express';
import { SellerApprovalUnblockuser, Sellerapprovalstatus, SellerapprovalstatusActive } from './Adminapprovalseller.js';



const approvalsellerauthrouting = express.Router();

approvalsellerauthrouting.get("/all", Sellerapprovalstatus);
approvalsellerauthrouting.put("/approval/:id", SellerapprovalstatusActive);
approvalsellerauthrouting.put("/approvalunblock/:id", SellerApprovalUnblockuser);

// authRouting.post("/currentuser", getCurrentuser);

export default approvalsellerauthrouting;