import mongoose from "mongoose";
const ConnectDb = () => {
    try {
        mongoose.connect(process.env.MONGGOSEURL).then((res) => {
            console.log("DB connected")
        }).catch((err) => {
            console.log("Db Connect Error")
        })
    }
    catch (err) {
        console.log(err);
    }
}

export default ConnectDb;