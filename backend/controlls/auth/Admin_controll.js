import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import Admin_models from "../../models/admin_model.js";

export const AdminRegister = async (req, res, next) => {
    const { email, password, roleNo, userName } = req.body;

    try {
        const existuser = await Admin_models.findOne({ email });
        if (existuser) {
            res.status(404).json({
                status: false,
                message: "User Already Exists"
            })
        }
        const passwordhashed = await bcrypt.genSalt(10);
        const createhashedpassword = await bcrypt.hash(password, passwordhashed);
        const registerseller = await Admin_models({
            userName,
            email, password: createhashedpassword,
            roleNo: 1
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



export const AdminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existuser = await Admin_models.findOne({ email });
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
    catch (err) {
        return res.status(404).json({
            status: false,
            message: err?.message
        })
    }
}

// get current user


export const getAdminCurrentuser = async (req, res) => {
    try {
        const Users = await Admin_models.findById(req.body.userid);



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