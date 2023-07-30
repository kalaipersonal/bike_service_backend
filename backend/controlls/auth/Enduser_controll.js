
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import enduser_model from "../../models/enduser_model.js";
import seller_model from "../../models/seller_model.js";

export const EnduserRegister = async (req, res, next) => {
    const { userName, email, password, contactno, enduserstatus } = req.body;
    try {
        const existuser = await enduser_model.findOne({ email });
        const existusersellercheck = await seller_model.findOne({ email });

        if (!existusersellercheck) {
            if (existuser) {
                res.status(404).json({
                    status: false,
                    message: "User Already Exists"
                })
            }
            const passwordhashed = await bcrypt.genSalt(10);
            const createhashedpassword = await bcrypt.hash(password, passwordhashed);
            const registerseller = await enduser_model({
                userName,
                email, password: createhashedpassword, contactno,
                roleNo: 3,
                enduserstatus
            })
            await registerseller.save();
            return res.status(201).json({
                status: true,
                registerseller
            })
        }
        else {
            res.status(404).json({
                status: false,
                message: "Email Already Exists"
            })
        }


    }
    catch (err) {
        return res.status(404).json({
            status: false,
            message: err
        })
    }
}



export const EnduserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existuser = await enduser_model.findOne({ email });


        if (existuser?.enduserstatus == true) {
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


export const getCurrentEnduser = async (req, res) => {
    try {
        const Users = await enduser_model.findById(req.body.userid);



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


export const UpdateprofileEnduser = async (req, res) => {
    try {
        const Users = await enduser_model.findByIdAndUpdate(req.params.id, req.body, { new: true });



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