import mongoose from "mongoose";



const AuthAdmin = new mongoose.Schema({
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
    role:{
        type:String,
        required:[true,"Role is Required"]
    }
},{
    timestamps:true
})


export default mongoose.model("adminauth",AuthAdmin);