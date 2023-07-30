import express from 'express';
import authRouting from './controlls/auth/index.js';
import authRoutingProduct from './controlls/productcreatecontroll/index.js';
import authadminRouting from './controlls/auth/adminrouting.js';
import approvalauthrouting from './controlls/adminapprovalproduct/index.js';
import approvalsellerauthrouting from './controlls/adminsellerapproval/index.js';
import AuthWorkersrouting from './controlls/workerscontroll/index.js';
import notificationAuthrouting from './controlls/notificationcontroll/index.js';
import enduserauthRouting from './controlls/auth/enduser_index.js';
import enduserAllproducts from './controlls/endusercontrolls/index.js';
import orderrouting from './controlls/orderbookingcontrolls/index.js';


const commonrouting = express.Router();

commonrouting.use("/auth/seller", authRouting)

// seller 

commonrouting.use("/product", authRoutingProduct)
commonrouting.use("/workers", AuthWorkersrouting)



// admin

commonrouting.use("/auth/admin", authadminRouting)
commonrouting.use("/admin/product", approvalauthrouting)
commonrouting.use("/admin/sellers", approvalsellerauthrouting)



// notification


commonrouting.use('/nofication',notificationAuthrouting);

// enduser auth

commonrouting.use('/auth/enduser',enduserauthRouting);
commonrouting.use('/customer',enduserAllproducts);
commonrouting.use('/order',orderrouting);







export default commonrouting;