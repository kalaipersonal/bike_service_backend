import { combineReducers } from "redux";
import reducer from "./Loaderreducer";
import logindata from './Usergetdata';
import workersdetails from './Workerdetails';

import adminreducer from './userGetadmin'
import cartreducer from './Cart';
const RootReducer = combineReducers({
    loader: reducer,
    userdetails: logindata,
    admin: adminreducer,
    workers: workersdetails,
    cart: cartreducer

});


export default RootReducer;