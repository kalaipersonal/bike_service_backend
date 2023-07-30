

import mongoose from "mongoose";


const Comment_Shema_worker = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerauth'
    },

})