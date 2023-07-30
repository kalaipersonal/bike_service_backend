
import mongoose from "mongoose";


const Seller_models = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Name is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    contactno: {
        type: String,
        required: [true, "Contact no is Required"]
    },
    role: {
        type: String,
        default: "Seller"
    },
    sellerStatus: {
        type: Boolean,
    },
    roleNo: {
        type: String,
        default: "2"
    },
    description: {
        type: String,
    },
    profileimage: {
        type: String,

    }
},
    {
        timestamps: true
    })


export default mongoose.model("sellerauth", Seller_models);