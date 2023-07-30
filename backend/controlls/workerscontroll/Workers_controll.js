import workers_models from "../../models/workers_models.js";


export const Createworker = async (req, res) => {

    const {
        username,
        email,
        contactno,
        alternatecontactno,
        bankname,
        adharcardno,
        accountno,
        description,
        workingexperience,
        age,
        profileimage,
        workerstatus
    } = req.body;

    console.log(req.body, 'kl')
    try {

        const workerscreate = await workers_models({
            username,
            email,
            contactno,
            alternatecontactno,
            bankname,
            adharcardno,
            accountno,
            description,
            workingexperience,
            age,
            user: req.body.userid,
            profileimage,
            workerstatus: true
        })


        await workerscreate.save();

        res.status(201).json({
            status: true,
            message: "Success",
            workerscreate
        })

    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: 'Error Message Workers'
        })
    }
}


export const Editworker = async (req, res) => {


    try {

        const workers = await workers_models.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            status: true,
            message: "Success",
            workers
        })

    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: 'Error Message Workers'
        })
    }
}

// get all

export const Getallworker = async (req, res) => {


    try {

        const workers = await workers_models.find({ user: req.body.userid }).populate('user');

        res.status(200).json({
            status: true,
            message: "Success",
            workers
        })

    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: 'Error Message Workers'
        })
    }
}

// delete


export const GetallworkerAdmin = async (req, res) => {


    try {

        const workers = await workers_models.find();
        res.status(200).json({
            status: true,
            message: "Success",
            workers
        })

    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: 'Error Message Workers'
        })
    }
}

export const Deleteworker = async (req, res) => {


    try {

        const workers = await workers_models.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: true,
            message: "Success",

        })

    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: 'Error Message Workers'
        })
    }
}

// get single 

export const GetSingleworker = async (req, res) => {


    try {

        const workers = await workers_models.findById(req.params.id);

        res.status(200).json({
            status: true,
            message: "Success",
            workers
        })

    }
    catch (err) {
        res.status(404).json({
            status: false,
            message: 'Error Message Workers'
        })
    }
}
