import multer from "multer";
import path from "path";
// Multer config
// const MulterData = multer({
//     storage: multer.diskStorage({}),
//     fileFilter: (req, file, cb) => {
//         let ext = path.extname(file.originalname);
//         if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//             cb(new Error("File type is not supported"), false);
//             return;
//         }
//         cb(null, true);
//     },
// });

const MulterData = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
})


export default MulterData;