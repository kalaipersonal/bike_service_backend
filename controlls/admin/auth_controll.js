import { PasswordGenrate } from "../../config/passwordbcrypt.js";
import auth_shema from "../../models/admin/auth_shema.js";

export const AuthRegister = async (req, res) => {
    const { username, email, password, role } = req.body;

    console.log(req.body, "kalai")
    try {

        const exitsemail = await auth_shema.findOne({ email });

        if (exitsemail) {
            res.status(200).json({
                success: false,
                message: "Email Already Exists"
            })
        }

        const passwordbcrypt = await PasswordGenrate(password);

        const createresponse = await  auth_shema({
            username,
            email,
            password: passwordbcrypt,
            role
        })

        await createresponse.save()

        res.status(201).json(createresponse);


    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: "something error"
        })
    }

}