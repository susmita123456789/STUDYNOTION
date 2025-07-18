// Import necessary modules
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
// const { uploadImageToCloudinary } = require("../utils/imageUploader")

// Create a new sub-section for a given section
// exports.createSubSection = async (req, res) => {
//   try {
//     // Extract necessary information from the request body
//     const { sectionId, title, description } = req.body
//     const video = req.files.video;

//     // Check if all necessary fields are provided
//     if (!sectionId || !title || !description || !video) {
//       return res
//         .status(404)
//         .json({ success: false, message: "All Fields are Required" })
//     }
//     console.log(video)

//     // Upload the video file to Cloudinary
//     const uploadDetails = await uploadImageToCloudinary(
//       video,
//       process.env.FOLDER_NAME
//     )
//     console.log(uploadDetails)
//     // Create a new sub-section with the necessary information
//     const SubSectionDetails = await SubSection.create({
//       title: title,
//       timeDuration: `${uploadDetails.duration}`,
//       description: description,
//       videoUrl: uploadDetails.secure_url,
//     })

//     // Update the corresponding section with the newly created sub-section
//     const updatedSection = await Section.findByIdAndUpdate(
//       { _id: sectionId },
//       { $push: { subSection: SubSectionDetails._id } },
//       { new: true }
//     ).populate("subSection")

//     // Return the updated section in the response
//     return res.status(200).json({ success: true, data: updatedSection })
//   } catch (error) {
//     // Handle any errors that may occur during the process
//     console.error("Error creating new sub-section:", error)
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     })
//   }
// }


// console.log("HEllooo betaaaaaa");
// // Create a new sub-section for a given section
// exports.createSubSection = async (req, res) => {
//     console.log("👉 Inside createSubSection now...");
//   try {
//     console.log("logs BODY:", req.body);
//     console.log("logs FILES:", req.files);

//     const { sectionId, title, description } = req.body;
//     // const video = req.files?.video; // get the uploaded video file
//     const video = req.files?.video; 
//     console.log(req.files);

//     // ✅ Validate input
//     if (!sectionId || !title || !description || !video) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields (sectionId, title, description, video) are required",
//       });
//     }

//     // ✅ Upload video to Cloudinary
//     const uploadDetails = await uploadImageToCloudinary(
//       video.tempFilePath, // ✅ express-fileupload provides tempFilePath
//       process.env.FOLDER_NAME
//     );
//     console.log("Cloudinary Upload Details:", uploadDetails);

//     // ✅ Create a new SubSection document
//     const subSection = await SubSection.create({
//       title: title,
//       timeDuration: `${uploadDetails.duration}`,
//       description: description,
//       videoUrl: uploadDetails.secure_url,
//     });

//     // ✅ Push the new SubSection into the Section
//     const updatedSection = await Section.findByIdAndUpdate(
//       sectionId,
//       { $push: { subSection: subSection._id } },
//       { new: true }
//     ).populate("subSection");

//     if (!updatedSection) {
//       return res.status(404).json({
//         success: false,
//         message: "Section not found",
//       });
//     }

//     // ✅ Success response
//     return res.status(200).json({
//       success: true,
//       message: "Sub-section created successfully",
//       data: updatedSection,
//     });
//   } catch (error) {
//     console.error("Error creating sub-section:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// Create a new sub-section for a given section (NO CLOUDINARY, NO FILE UPLOAD)
exports.createSubSection = async (req, res) => {
  try {
    console.log("👉 Inside createSubSection (NO CLOUDINARY)");

    console.log("logs BODY:", req.body);

    const { sectionId, title, description, videoUrl } = req.body;

    // ✅ Validate fields (no req.files now)
    if (!sectionId || !title || !description || !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "All fields (sectionId, title, description, videoUrl) are required",
      });
    }

    // ✅ Create a new SubSection document
    const subSection = await SubSection.create({
      title: title,
      timeDuration: "00:02", // dummy duration
      description: description,
      videoUrl: videoUrl, // directly use the provided URL
    });

    // ✅ Push the new SubSection into the Section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      { $push: { subSection: subSection._id } },
      { new: true }
    ).populate("subSection");

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    console.log("✅ Subsection created (no cloudinary):", subSection);

    return res.status(200).json({
      success: true,
      message: "Sub-section created successfully (no cloudinary)",
      data: updatedSection,
    });

  } catch (error) {
    console.error("Error creating sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};






// ✅ Update an existing sub-section (NO CLOUDINARY)
exports.updateSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description, videoUrl } = req.body;

    // Find existing sub-section
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    // Update fields if provided
    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }

    // ✅ Instead of Cloudinary upload, just update videoUrl if you pass it
    if (videoUrl !== undefined) {
      subSection.videoUrl = videoUrl; // you can pass a dummy or actual URL
      subSection.timeDuration = "00:02"; // dummy duration
    }

    // Save the updated sub-section
    await subSection.save();

    // Find the parent section and return with populated sub-sections
    const updatedSection = await Section.findById(sectionId).populate("subSection");

    console.log("✅ Updated section (no Cloudinary):", updatedSection);

    return res.status(200).json({
      success: true,
      message: "Sub-section updated successfully (no Cloudinary)",
      data: updatedSection,
    });
  } catch (error) {
    console.error("❌ Error updating sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the sub-section",
      error: error.message,
    });
  }
};








exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    )
    const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" })
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    )

    return res.json({
      success: true,
      message: "SubSection deleted successfully",
      data: updatedSection,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the SubSection",
    })
  }
}