import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});
const uploadOnCloudinary = async(localFilePath)=>{
   try {
    if(!localFilePath) return null
    // uploading file on cloudinary
    const file = await cloudinary.uploader.upload(localFilePath, {resource_type:'auto'})
    //file has been uploaded
    console.log("File has been uploaded successfully",file.url)
    return file.url // return file is ok but file url is done by me not hitesh chaudary
   } catch (error) {
    fs.unlinkSync(localFilePath)
    return null;
   }
}
export {uploadOnCloudinary}
