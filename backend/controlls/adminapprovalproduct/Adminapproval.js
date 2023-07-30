import product_models from "../../models/product_models.js"


export const ApprovalProduct = async (req, res) => {
    try {

        const AllProducts = await product_models.find().populate("user");

        res.status(200).json({
            status: true,
            message: 'ALL Products',
            AllProducts
        })

    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: "Approval error something"
        })
    }
}

// approval process

export const ApprovalProductStatus = async (req, res) => {
    try {

        const AllProducts = await product_models.findByIdAndUpdate(req.params.id, {
            approvalStatus: "2"
        }, {
            new: true
        }).populate("user");


        res.status(200).json({
            status: true,
            message: 'Updated Status',

        })

    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: "Approval error something"
        })
    }
}

// rejected

export const ApprovalProductStatusRejected = async (req, res) => {
    try {

        const AllProducts = await product_models.findByIdAndUpdate(req.params.id, {
            approvalStatus: "3"
        }, {
            new: true
        }).populate("user");


        res.status(200).json({
            status: true,
            message: 'Updated Status',

        })

    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: "Approval error something"
        })
    }
}