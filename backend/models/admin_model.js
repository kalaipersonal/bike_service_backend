
import mongoose from "mongoose";


const Admin_models = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User Name is Required']
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

    },
    role: {
        type: String,
        default: "Admin"
    },
    roleNo: {
        type: String,
        default: "1"
    }
},
    {
        timestamps: true
    })


export default mongoose.model("adminauth", Admin_models);