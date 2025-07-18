// const cloudinary = require('cloudinary').v2


// exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
//     const options = {folder};
//     if(height) {
//         options.height = height;
//     }
//     if(quality) {
//         options.quality = quality;
//     }
//     options.resource_type = "auto";

//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }





const cloudinary = require('cloudinary').v2;

// ✅ This helper now accepts a file path directly
exports.uploadImageToCloudinary = async (filePath, folder, height, quality) => {
  try {
    // ✅ Build upload options
    const options = { folder };

    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }

    // ✅ Allow Cloudinary to automatically detect resource type (image/video/raw)
    options.resource_type = "auto";

    // ✅ Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, options);

    // ✅ Return upload details (secure_url, duration, etc.)
    return result;
  } catch (error) {
    console.error("❌ Error uploading to Cloudinary:", error);
    throw error;
  }
};
