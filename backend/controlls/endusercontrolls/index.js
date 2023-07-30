import express from 'express';
import { Allproductslist, Singleproductslist } from './endusercontrolls.js';



const enduserAllproducts = express.Router();

enduserAllproducts.get("/allproducts", Allproductslist)
enduserAllproducts.get("/singleproducts/:id", Singleproductslist)

// enduserAuthrouting.post("/getall", Getalladminnotification)
// enduserAuthrouting.put("/update", Updatenotification)




export default enduserAllproducts;