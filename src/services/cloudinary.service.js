import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadCloudinary(localFilePath) {
  if (!localFilePath) {
    throw new Error("Local file path is empty");
  }

  // Upload an video,image
  const uploadResult = await cloudinary.uploader
    .upload(localFilePath, {
      format: "auto",
    })
    .catch((error) => {
      console.log("Error while uploading file to cloudinary", error);
      return null;
    });

  console.log(
    "uploadResult from cloudinary file uploaded successfully!!!",
    uploadResult
  );

  return uploadResult;
}

export { uploadCloudinary };
