const { Mongoose } = require("mongoose");
const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

// exports.createCategory = async (req, res) => {
// 	try {
// 		const { name, description } = req.body;
// 		if (!name) {
// 			return res
// 				.status(400)
// 				.json({ success: false, message: "All fields are required" });
// 		}
// 		const CategorysDetails = await Category.create({
// 			name: name,
// 			description: description,
// 		});
// 		console.log(CategorysDetails);
// 		return res.status(200).json({
// 			success: true,
// 			message: "Categorys Created Successfully",
//       category: CategorysDetails, // ✅ include the created category
// 		});
// 	} catch (error) {
// 		return res.status(500).json({
// 			success: true,
// 			message: error.message,
// 		});
// 	}
// };




exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create category
    const categoryDetails = await Category.create({ name, description });
    console.log("✅ Created Category:", categoryDetails);

    // Respond with created category
    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
      category: categoryDetails,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// exports.createCategory = async (req, res) => {
//   try {
//     const { name, description } = req.body;

//     // validate name
//     if (!name) {
//       return res.status(400).json({
//         success: false,
//         message: "Category name is required",
//       });
//     }

//     // create category in DB
//     const categoryDetails = await Category.create({
//       name,
//       description,
//     });

//     console.log("Created category:", categoryDetails);

//     return res.status(200).json({
//       success: true,
//       message: "Category created successfully",
//       category: categoryDetails, // ✅ include the created category
//     });
//   } catch (error) {
//     console.error("Error creating category:", error);
//     return res.status(500).json({
//       success: false, // ✅ should be false on error
//       message: error.message,
//     });
//   }
// };



exports.showAllCategories = async (req, res) => {
	try {
        console.log("INSIDE SHOW ALL CATEGORIES");
		const allCategorys = await Category.find({});
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

//categoryPageDetails 

exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }