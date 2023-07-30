import orderboking_model from "../../models/orderboking_model.js";

export const createbooking = async (req, res, next) => {

    const { orderdetails, paymenttype, GST, workerdetails, userdetails, totalAmount } = req.body;
    try {


        const ids = Math.random() * 10000;

        const responseCreate = await orderboking_model({
            orderdetails,
            paymenttype,
            GST,
            orderId: ids,
            enduser: req.body.enduserid,
            seller: req.body.sellerid,
            workerdetails,
            userdetails,
            totalAmount
        })


        await responseCreate.save();

        res.status(201).json({
            status: true,
            message: "Success",
            data: responseCreate
        })
    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Error order create",
            error
        })
    }
}


// all orders

export const Allordersbooking = async (req, res, next) => {



    try {




        const responseCreate = await orderboking_model.find({ enduser: req.body.userid })
        res.status(200).json({
            status: true,
            message: "Success",
            data: responseCreate
        })
    } catch (error) {
        res.status(404).json({
            status: false,
            message: "Error order create",
            error
        })
    }
}