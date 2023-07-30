import mongoose from 'mongoose';


const Order_shema = new mongoose.Schema({
    orderdetails: {
        type: Array,
        default: []
    },
    paymenttype: {
        type: String,
        required: [true, "Required"]
    },
    GST: {
        type: String,
        required: [true, 'Required']
    },
    orderId: {
        type: String,
        required: [true, "Required"]
    },
    enduser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'enduserauth'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerauth'
    },
    workerdetails: {
        type: Array,
        required: [true, 'Required']
    },
    userdetails: {
        type: Array,
        required: [true, 'Required']
    },
    totalAmount: {
        type: String,
        required: [true, 'Required']
    }
}, {
    timestamps: true
})


export default mongoose.model('orderdetails', Order_shema);