import { v2 as cloudinary } from 'cloudinary';



const cloudinarys = cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.CLOUDAPIKEY,
    api_secret: process.env.CLOUDAPISECRET
});


export default cloudinarys;