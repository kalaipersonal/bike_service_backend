import { PasswordGenrate } from "../../config/passwordbcrypt.js";
import auth_shema from "../../models/seller/auth_shema.js";
import auth_shemaadmin from "../../models/admin/auth_shema.js";


export const AuthRegister = async (req, res) => {
    const { username, email, password, role, contactno } = req.body;
    try {

        const exitsemail = await auth_shema.findOne({ email });
        const adminemailcheck = await auth_shemaadmin.findOne({ email });
        if (adminemailcheck) {
            res.status(200).json({
                success: false,
                message: "Email Already Exists"
            })

        }
        else {

            if (exitsemail) {
                res.status(200).json({
                    success: false,
                    message: "Email Already Exists"
                })
            }
            const passwordbcrypt = await PasswordGenrate(password);
            const createresponse = await auth_shema({
                username,
                email,
                password: passwordbcrypt,
                role,
                contactno,
                approvalStatus: "0"
            })
            await createresponse.save()
            res.status(201).json(createresponse);
        }

    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "something error"
        })
    }

}