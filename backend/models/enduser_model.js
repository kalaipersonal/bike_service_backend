
import mongoose from "mongoose";


const Enduser_models = new mongoose.Schema({
    userName: {
        type: String,
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
        default: "enduser"
    },
    roleNo: {
        type: String,
        default: "3"
    },
    enduserstatus:{
        type:Boolean,
        default:true
    }
},
    {
        timestamps: true
    })


export default mongoose.model("enduserauth", Enduser_models);