import express from 'express';
import { Createproduct, Deleteproduct, GetSingleproduct, Getproduct, UpdateSingleproduct } from './Productcontroll.js';


import multer from "multer";
import MiddleWare from '../../config/Middleware.js';
import MulterData from '../../config/Multersimage.js';
import path from 'path';

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, callback) => {
        return callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})


const authRoutingProduct = express.Router();

authRoutingProduct.post("/create", Createproduct);
authRoutingProduct.post("/getall", Getproduct);
authRoutingProduct.get("/getsingledata/:id", GetSingleproduct);
authRoutingProduct.put("/update/:id", UpdateSingleproduct);
authRoutingProduct.delete("/delete/:id", Deleteproduct);






export default authRoutingProduct;