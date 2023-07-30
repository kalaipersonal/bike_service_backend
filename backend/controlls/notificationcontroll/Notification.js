import notification_models from "../../models/notification_models.js";
import notification_seller_model from "../../models/notification_seller_model.js";


export const Createnotification = async (req, res) => {

    const { userName, title, image, typeId, readstatus, onClickpath } = req.body;
    try {

        const CreateNotify = await notification_models({
            userName, title, image, typeId,
            user: req.body.userid,
            readstatus: false,
            onClickpath
        })

        await CreateNotify.save();
        res.status(201).json({
            status: true,
            message: "Success Notify",
            CreateNotify
        })

    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Something  error Notify",
        })

    }
}


// get all notification

export const Getalladminnotification = async (req, res) => {
    try {

        const CreateNotify = await notification_models.find().sort({ createdAt: -1 });

        res.status(201).json({
            status: true,
            message: "Success Notify",
            CreateNotify
        })

    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Something  error Notify",
        })

    }
}

// update notification status

export const Updatenotification = async (req, res) => {
    try {

        // {
        //     user: req.body.userid, readstatus: false
        // }
        if (req.body.typeId == 1) {
            const CreateNotify = await notification_models.updateMany({
                $set: { readstatus: true }
            });
            res.status(201).json({
                status: true,
                message: "Success Notify",
            })
        }
        else {
            res.status(404).json({
                status: false,
                message: "Something  error admin Notify",
            })
        }



    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Something  error Notify",
        })

    }
}

// 

// seller notifications




export const CreateSellernotification = async (req, res) => {

    const { userName, title, image, readstatus, onClickpath } = req.body;
    try {

        const CreateNotify = await notification_seller_model({
            userName, title, image,
            user: req.body.userid,
            readstatus: false,
            onClickpath
        })

        await CreateNotify.save();
        res.status(201).json({
            status: true,
            message: "Success Notify",
            CreateNotify
        })

    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Something  error Notify",
        })

    }
}

// get all notifcations

export const GetallSellernotification = async (req, res) => {

    try {

        const CreateNotify = await notification_seller_model.find({ user: req.body.userid })


        res.status(200).json({
            status: true,
            message: "Success Notify",
            CreateNotify
        })

    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Something  error Notify",
        })

    }
}


// update seller

export const UpdatenotificationSeller = async (req, res) => {
    try {

       
            const CreateNotify = await notification_seller_model.updateMany({
                $set: { readstatus: true }
            });
            res.status(201).json({
                status: true,
                message: "Success Notify",
            })
       



    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Something  error Notify",
        })

    }
}