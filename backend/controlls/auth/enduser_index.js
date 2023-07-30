import express from 'express';
import { EnduserLogin, EnduserRegister, UpdateprofileEnduser, getCurrentEnduser } from './Enduser_controll.js';


const enduserauthRouting = express.Router();

enduserauthRouting.post("/register", EnduserRegister);
enduserauthRouting.post("/login", EnduserLogin);
enduserauthRouting.post("/currentuser", getCurrentEnduser);
enduserauthRouting.put("/update/:id", UpdateprofileEnduser);


export default enduserauthRouting;