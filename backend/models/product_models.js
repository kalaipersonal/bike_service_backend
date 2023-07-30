import mongoose, { Schema } from 'mongoose';



const Product_Shema = new mongoose.Schema({
    productname: {
        type: String,
        required: [true, "Product Name is Required"]
    },
    productid: {
        type: String,
        required: [true, "Product Id is Required"]
    },
    price: {
        type: String,
        required: [true, "Price  is Required"]
    },
    newprice: {
        type: String,
        required: [true, "newprice  is Required"]
    },
    couponcode: {
        type: String,
        required: [true, "couponcode  is Required"]
    },
    categories: {
        type: String,
        required: [true, "categories  is Required"]
    },
    vehicletype: {
        type: String,
        required: [true, "vehicletype  is Required"]
    },
    workingslots: {
        type: Array,
        default: [],
        required: [true, "workingslots  is Required"]
    },
    workerdetails: {
        type: Schema.Types.ObjectId,
        ref: 'wokersmodel'
    },
    description: {
        type: String,
        required: [true, "description  is Required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'sellerauth'
    },
    productimages: {
        type: Array,
        required: [true, "productimages  is Required"]
    },
    approvalStatus: {
        type: String,
        default: "1"
    },


}, {
    timestamps: true
})

export default mongoose.model("productmodel", Product_Shema);