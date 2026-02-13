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

const deleteFile = async (fileUrl: string) => {
    try {
        if (!fileUrl) {
            throw new Error("No file URL provided")
        }
        // Extract public_id from Cloudinary URL
        // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}
        const urlParts = fileUrl.split('/');
        const fileName = urlParts[urlParts.length - 1]; // Get the last part (filename with extension)
        const publicId = fileName.split('.')[0]; // Remove file extension to get public_id

        const response = await cloudinary.uploader.destroy(publicId);
        console.log("File deleted successfully from Cloudinary");
        console.log("Deletion response:", response);
        return response;
    } catch (error) {
        console.log("Error deleting file from Cloudinary:", error)
        return;
    }
}

export { uploadFile, deleteFile };