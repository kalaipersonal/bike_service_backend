import product_models from "../../models/product_models.js";
import cloudinarys from './../../config/Cloudinarydata.js';




export const Createproduct = async (req, res, next) => {


    const {

        productname, price, newprice, couponcode, vehicletype, workingslots, categories, workerdetails, productid, description,
        approvalStatus,
        productimages
    } = req.body;


    try {





        const CreateProductnew = await new product_models({
            productname, price, newprice, couponcode, vehicletype, workingslots, categories, productid, description,
            user: req.body.userid,
            approvalStatus: '1',
            productimages: productimages,
            workerdetails: req.body.workerid
        })

        await CreateProductnew.save();


        res.status(201).json({
            status: true,
            message: "Success",
            CreateProductnew
        })


    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: "Product Create Error"
        })
    }
}


export const Getproduct = async (req, res, next) => {










    try {

        const CreateProductnew = await product_models.find({ user: req.body.userid }).populate("user").populate('workerdetails');
        res.status(200).json({
            status: true,
            message: "Success",
            CreateProductnew
        })


    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: "Product Create Error"
        })
    }
}


// get id


export const GetSingleproduct = async (req, res, next) => {


    try {

        const CreateProductnew = await product_models.findById(req.params.id).populate("user");
        res.status(200).json({
            status: true,
            message: "Success",
            CreateProductnew
        })


    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: "Product Create Error"
        })
    }
}

// update

export const UpdateSingleproduct = async (req, res, next) => {


    try {

        const CreateProductnew = await product_models.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            status: true,
            message: "Updated Successfully",

        })


    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: "Product Create Error"
        })
    }
}


// delete

export const Deleteproduct = async (req, res, next) => {


    try {

        const CreateProductnew = await product_models.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: true,
            message: "Deleted Successfully",

        })


    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: "Product Create Error"
        })
    }
}