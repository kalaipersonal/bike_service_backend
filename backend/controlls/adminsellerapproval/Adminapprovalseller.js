import seller_model from "../../models/seller_model.js"



export const Sellerapprovalstatus = async (req, res) => {
    try {

        const ApprovalSellerdata = await seller_model.find();

        res.status(200).json({
            status: true,
            message: "Sucess",
            ApprovalSellerdata
        })

    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: "Somehting Error Seller Approval"
        })
    }
}

// active and inactive set
export const SellerapprovalstatusActive = async (req, res) => {
    try {

        const ApprovalSellerdata = await seller_model.findByIdAndUpdate(req.params.id, {
            sellerStatus: false
        }, {
            new: true
        });

        res.status(200).json({
            status: true,
            message: "Sucess Update In Status",

        })

    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: "Somehting Error Seller Approval"
        })
    }
}

// unblock sellers

export const SellerApprovalUnblockuser = async (req, res) => {
    try {

        const ApprovalSellerdata = await seller_model.findByIdAndUpdate(req.params.id, {
            sellerStatus: true
        }, {
            new: true
        });

        res.status(200).json({
            status: true,
            message: "Sucess Update In Status",

        })

    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: "Somehting Error Seller Approval"
        })
    }
}