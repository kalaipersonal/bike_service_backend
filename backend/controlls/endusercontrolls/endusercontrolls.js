import product_models from "../../models/product_models.js"
import seller_model from "../../models/seller_model.js";




export const Allproductslist = async (req, res, next) => {
    try {
        const datas = await product_models.find().populate('user').populate('workerdetails');



        const checksellerstatus = await seller_model.find();


        // let sellerdata = []

        // checksellerstatus.forEach((item, index) => {

        //     if (item?.sellerStatus == true) {
        //         console.log(item, "item")
        //         sellerdata.push(item);

        //     }
        // })






        res.status(200).json({
            status: true,
            message: "Success",
            data: datas
        })


    } catch (error) {
        res.status(200).json({
            status: false,
            message: "error",
            error
        })

    }
}


// get single 
export const Singleproductslist = async (req, res, next) => {
    try {
        const datas = await product_models.findById(req.params.id).populate('user').populate("workerdetails");



        const checksellerstatus = await seller_model.find();


        // let sellerdata = []

        // checksellerstatus.forEach((item, index) => {

        //     if (item?.sellerStatus == true) {
        //         console.log(item, "item")
        //         sellerdata.push(item);

        //     }
        // })






        res.status(200).json({
            status: true,
            message: "Success",
            data: datas
        })


    } catch (error) {
        res.status(200).json({
            status: false,
            message: "error",
            error
        })

    }
}