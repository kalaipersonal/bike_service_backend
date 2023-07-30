import mongoose from 'mongoose';

const Workers_Shema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Required']
    },
    email: {
        type: String,
        required: [true, 'Required']
    },
    age: {
        type: String,
        required: [true, 'Required']
    },
    contactno: {
        type: String,
        required: [true, 'Required']
    },
    alternatecontactno: {
        type: String,
        required: [true, 'Required']
    },
    bankname: {
        type: String,
        required: [true, 'Required']
    },
    adharcardno: {
        type: String,
        required: [true, 'Required']
    },
    accountno: {
        type: String,
        required: [true, 'Required']
    },
    description: {
        type: String,
        required: [true, 'Required']
    },
    workingexperience: {
        type: String,
        required: [true, 'Required']
    },
    profileimage: {
        type: String,
        required: [true, 'Required']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellerauth'
    },
    workerstatus: {
        type: Boolean,
        default: true
    }
    // comment: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'sellerauth'
    // }

}, {
    timestamps: true
})


export default mongoose.model('wokersmodel', Workers_Shema);