// import jwt from 'jsonwebtoken';


// const MiddleWare = async (req, res, next) => {
//     try {
//         console.log(req.header, "-------------------------->header ")
//         // const token = req.headers("authorization").split(" ")[1];

//         console.log(req.headers.authorization.split(' ')[1], "----->header token")
//         const tokenVerifyCheck = await jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKENKEY);
//         req.body.userid = tokenVerifyCheck.userid;
//         next();
//     }
//     catch (err) {
//         res.status(401).json({
//             status: false,
//             message: "Token Expired"
//         })
//         console.log("------------->", err)
//     }
// }


// export default MiddleWare;




import jwt from 'jsonwebtoken';



const MiddleWare = async (req, res, next) => {
    try {
        const decods = await jwt.verify(req.headers.authorization, process.env.TOKENKEY, ((err, res) => {
            if (err) {
                res.status(404).josn("something error token")
            }
            else {

                if (res?._id) {
                    req.userid = res?.userid;
                    next();

                }
                else {
                    res.status(404).josn("something error token")
                }

            }
        }));
    }
    catch (err) {
        res.status(404).json("User Token Missing Error")
    }
}

export default MiddleWare;
