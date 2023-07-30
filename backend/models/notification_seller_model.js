import mongoose from "mongoose";


const Notification_shema_seller = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Required"]
    },
    image: {
        type: String,
        required: [true, "Required"]
    },
    userName: {
        type: String,
        required: [true, 'Required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerauth'
    },
    readstatus: {
        type: Boolean,
        default: false
    },
    onClickpath: {
        type: String,
        required: [true, 'Required']
    }
},
    {
        timestamps: true
    })

export default mongoose.model("notificationseller", Notification_shema_seller);