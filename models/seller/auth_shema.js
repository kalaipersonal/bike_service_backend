import mongoose from "mongoose";



const AuthSeller = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name is Required"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    contactno: {
        type: String,
        required: [true, "Contactno is Required"]
    },
    role: {
        type: String,
        required: [true, "Role is Required"]
    },
    approvalStatus:{
        type:String,
        default:0
    }
}, {
    timestamps: true
})


export default mongoose.model("sellerauth", AuthSeller);