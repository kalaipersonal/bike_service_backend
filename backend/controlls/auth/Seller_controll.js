import Seller_models from "../../models/seller_model.js";
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

export const SellerRegister = async (req, res, next) => {
    const { userName, email, password, contactno, roleNo, sellerStatus } = req.body;
    try {
        const existuser = await Seller_models.findOne({ email });
        if (existuser) {
            res.status(404).json({
                status: false,
                message: "User Already Exists"
            })
        }
        const passwordhashed = await bcrypt.genSalt(10);
        const createhashedpassword = await bcrypt.hash(password, passwordhashed);
        const registerseller = await Seller_models({
            userName,
            email, password: createhashedpassword, contactno,
            sellerStatus: true,
            roleNo: 2
        })
        await registerseller.save();
        return res.status(201).json({
            status: true,
            registerseller
        })
    }
    catch (err) {
        return res.status(404).json({
            status: false,
            message: err
        })
    }
}



export const SellerLogin = async (req, res) => {
    const { email, password, sellerStatus } = req.body;

    try {
        const existuser = await Seller_models.findOne({ email });


        if (existuser?.sellerStatus == true) {
            if (!existuser) {
                return res.status(404).json({
                    status: false,
                    message: "User Not Exists"
                })
            }
            const comparepassword = await bcrypt.compare(password, existuser?.password);
            if (!comparepassword) {
                return res.status(404).json({
                    status: false,
                    message: "Invalid Password or Email"
                })
            }

            const token = await jwt.sign({ userid: existuser?._id }, process.env.TOKENKEY, { expiresIn: "10m" });


            return res.status(200).json({
                status: true,
                user: existuser,
                token: token,

            })
        }
        else {
            res.status(400).json({
                status: false,
                message: "User Blocked"
            })
        }


    }
    catch (err) {
        return res.status(404).json({
            status: false,
            message: err?.message
        })
    }
}

// get current user


export const getCurrentuser = async (req, res) => {
    try {
        const Users = await Seller_models.findById(req.body.userid);



        res.status(200).json({
            status: true,
            message: "success",
            data: Users
        })

    }
    catch (err) {
        return res.status(401).json({
            status: false,
            message: err?.message
        })
    }
}

// update profile


export const Updateprofile = async (req, res) => {
    try {
        const Users = await Seller_models.findByIdAndUpdate(req.params.id, req.body, { new: true });



        res.status(200).json({
            status: true,
            message: "Updated Profile",

        })

    }
    catch (err) {
        return res.status(401).json({
            status: false,
            message: err?.message
        })
    }
}