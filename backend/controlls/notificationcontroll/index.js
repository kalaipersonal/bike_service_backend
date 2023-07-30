import express from 'express';
import { CreateSellernotification, Createnotification, GetallSellernotification, Getalladminnotification, Updatenotification, UpdatenotificationSeller } from './Notification.js';


const notificationAuthrouting = express.Router();

notificationAuthrouting.post("/create", Createnotification)
notificationAuthrouting.post("/createseller", CreateSellernotification)

notificationAuthrouting.post("/getall", Getalladminnotification)
notificationAuthrouting.post("/getallseller", GetallSellernotification)

notificationAuthrouting.put("/update", Updatenotification)
notificationAuthrouting.put("/updateseller", UpdatenotificationSeller)





export default notificationAuthrouting;