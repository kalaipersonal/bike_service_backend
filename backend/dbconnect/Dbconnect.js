import mongoose from "mongoose";

var options = {server: {socketOptions: {socketTimeoutMS: 10000}}};
const ConnectDb = async () => {
    try {

        mongoose.connect(process.env.MONGOOSEKEY,{
            useUnifiedTopology: true, // For Mongoose 5 only. Remove for Mongoose 6+
            serverSelectionTimeoutMS: 1000, // Defaults to 30000 (30 seconds
        }).then((res) => {
            console.log("DB Connected");
        }).catch((err) => {
            console.log(err);
        })

    }
    catch (err) {
        console.log("Db Connect Error");
    }
}


export default ConnectDb;