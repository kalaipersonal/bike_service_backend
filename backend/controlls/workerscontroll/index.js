import express from 'express';
import { Createworker, Deleteworker, Editworker, GetSingleworker, Getallworker, GetallworkerAdmin } from './Workers_controll.js';



const AuthWorkersrouting = express.Router();

AuthWorkersrouting.post("/create", Createworker);
AuthWorkersrouting.post("/getall", Getallworker);
AuthWorkersrouting.get("/getallworkers", GetallworkerAdmin);

AuthWorkersrouting.get("/getsingledata/:id", GetSingleworker);
AuthWorkersrouting.put("/update/:id", Editworker);
AuthWorkersrouting.delete("/delete/:id", Deleteworker);






export default AuthWorkersrouting;