import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

const uploadFile = async (localFilePath : string) => {
    try {
        if (!localFilePath) {
            throw new Error("No file path provided")
        }
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log("File uploaded successfully to Cloudinary");
        console.log("Cloudinary response :", response.url);
        fs.unlinkSync(localFilePath);
        return response.url;

    } catch (error) {
        console.log(error)
        return;
    }
}

export { uploadFile };