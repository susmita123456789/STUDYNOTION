
// import { useState } from "react"
// import { useSelector } from "react-redux"
// import { toast } from "react-hot-toast"
// import IconBtn from "../../../common/IconBtn"
// // import { createCategory } from "../../../../services/operations/categoryAPI"
// // /
// import {fetchCourseCategories } from "../../../../services/operations/courseDetailsAPI";
// import { createCategory } from "../../../../services/operations/categoryAPI"; // your existing API



// export default function CreateCategoryForm() {
//   const { token } = useSelector((state) => state.auth)
//   const [name, setName] = useState("")
//   const [description, setDescription] = useState("")
//   const [loading, setLoading] = useState(false)

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault()
//   //   if (!name.trim()) {
//   //     toast.error("Category name is required")
//   //     return
//   //   }

//   //   setLoading(true)

//   //   const result = await createCategory({ name, description }, token)

//   //   if (result) {
//   //     toast.success(`Category "${result.category.name}" created!`)
//   //     setName("")
//   //     setDescription("")
//   //   } else {
//   //     toast.error("Failed to create category.")
//   //   }

//   //   setLoading(false)
//   // }




//   const handleCreateCategory = async () => {
//   setLoading(true);

//   const result = await createCategory({ name, description }, token);

//   if (result) {
//     toast.success(`Category "${result.category.name}" created!`);
//     setName("");
//     setDescription("");

//     // ✅ Immediately fetch the latest categories and update state
//     const updatedCategories = await fetchCourseCategories();
//     // setCourseCategories(updatedCategories); // or dispatch to redux
//       dispatch(setCategories(updatedCategories)); // updates redux
//   } else {
//     toast.error("Failed to create category.");
//   }

//   setLoading(false);
// };


//   return (
//     <div className="space-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 max-w-md">
//       <h1 className="text-2xl font-semibold text-richblack-5">Create Category</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Category Name */}
//         <div className="flex flex-col space-y-2">
//           <label htmlFor="categoryName" className="text-sm text-richblack-5">
//             Category Name <sup className="text-pink-200">*</sup>
//           </label>
//           <input
//             id="categoryName"
//             type="text"
//             placeholder="Enter category name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="form-style"
//           />
//         </div>

//         {/* Category Description */}
//         <div className="flex flex-col space-y-2">
//           <label htmlFor="categoryDesc" className="text-sm text-richblack-5">
//             Category Description
//           </label>
//           <textarea
//             id="categoryDesc"
//             placeholder="Enter category description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="form-style min-h-[100px]"
//           />
//         </div>

//         <div className="flex justify-end">
//           <IconBtn disabled={loading} text="Create Category" />
//         </div>
//       </form>
//     </div>
//   )
// }





import { useState } from "react";

import { toast } from "react-hot-toast";
import { setCategories } from "../../../../slices/courseSlice";
import {fetchCourseCategories } from "../../../../services/operations/courseDetailsAPI";
import {createCategory} from "../../../../services/operations/categoryAPI";
// import { apiConnector } from "../../../../services/apiconnector"
// import { categories } from "../../services/apis"
import { useSelector, useDispatch } from "react-redux";
import IconBtn from "../../../common/IconBtn"
   console.log("hellloooooo betaa simghhhh")
export default function CreateCategoryForm() {
  const dispatch = useDispatch();
    // ✅ Get token directly from Redux
  const { token } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleCreateCategory = async () => {
  //   setLoading(true);

  //   const result = await createCategory({ name, description }, token);

  //   if (result) {
  //     toast.success(`Category "${result.category.name}" created!`);
  //     setName("");
  //     setDescription("");

  //     // ✅ Refetch categories from backend
  //     const updatedCategories = await fetchCourseCategories();
  //     dispatch(setCategories(updatedCategories)); // updates redux
  //   } else {
  //     toast.error("Failed to create category.");
  //   }

  //   setLoading(false);
  // };


 console.log("hellloooooo betaa simghhhh")

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!name.trim()) {
//     toast.error("Category name is required");
//     return;
//   }

//   setLoading(true);

  
//  console.log("📦 Sending categoryData:", { name, description });
//     console.log("🔑 Token being sent:", token);
//      setLoading(true);


//   const result = await createCategory({ name, description }, token);
//     // ✅ Log what came back from backend
//     // console.log("name",name);
//     // console.log("description",description);
//     // console.log("Token",token);
//      console.log("✅ createCategory result:", result);




// //   if (result?.success) {
// //     toast.success(`Category "${result.category.name}" created!`);
// //     setName("");
// //     setDescription("");

// //     // ✅ Fetch updated categories and update Redux
// //     const updatedCategories = await fetchCourseCategories();
// //     dispatch(setCategories(updatedCategories)); 
// //     // 🔥 NOTE: replace `setCourseCategories` with whatever action updates your category list in Redux
// //   } else {
// //     toast.error(result?.message || "Failed to create category.");
// //   }

// //   setLoading(false);
// // };




//   if (result) {
//     toast.success(`Category "${result.category.name}" created!`);
//     setName("");
//     setDescription("");
//       // force reload catalog page
//   window.location.reload();


//     // ✅ Immediately fetch the latest categories and update state
//     const updatedCategories = await fetchCourseCategories();
//     // setCategories(updatedCategories); // or dispatch to redux
//     console.log("updatyaedCategories",updatedCategories);
//       dispatch(setCategories(updatedCategories)); // updates redux
//   } else {
//     toast.error("Failed to create category.");
//   }

//   setLoading(false);
// };



// import { useDispatch } from "react-redux"
// import { setCategories } from "../../slices/courseSlice"
// import { apiConnector } from "../../services/apiconnector"
// import { categories } from "../../services/apis"
// import { createCategory } from "../../services/operations/courseDetailsAPI" // adjust import

// // somewhere at top of component
// const dispatch = useDispatch()

const handleSubmit = async (e) => {
  e.preventDefault()

  if (!name.trim()) {
    toast.error("Category name is required")
    return
  }

  setLoading(true)
  console.log("📦 Sending categoryData:", { name, description })
  console.log("🔑 Token being sent:", token)

  // try {
  //   // Create category
  //   const result = await createCategory({ name, description }, token)
  //   console.log("✅ createCategory result:", result)

  //   if (result?.success) {
  //     toast.success(`Category "${result.category.name}" created!`)
  //     setName("")
  //     setDescription("")

  //     // ✅ Fetch updated categories
  //     const res = await apiConnector("GET", "http://localhost:4000/api/v1/course/createCategory")
  //     const updatedCategories = res?.data?.data || []

  //     // ✅ Update Redux
  //     dispatch(setCategories(updatedCategories))
  //     console.log("✅ Updated categories in Redux:", updatedCategories)
  //   } else {
  //     toast.error(result?.message || "Failed to create category.")
  //   }
  // } catch (err) {
  //   console.error("❌ Error creating category:", err)
  //   toast.error("Something went wrong while creating category.")
  // }



  const result = await createCategory({ name, description }, token);
console.log("✅ createCategory result:", result);

if (result) {
  toast.success(`Category "${result.category.name}" created!`);
  setName("");
  setDescription("");
  // reload
  // window.location.reload();

  // fetch updated
  const updatedCategories = await fetchCourseCategories();
  dispatch(setCategories(updatedCategories));
} else {
  toast.error("Failed to create category.");
}


  setLoading(false)
}




  return (
    <div className="space-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 max-w-md">
      <h1 className="text-2xl font-semibold text-richblack-5">Create Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Name */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="categoryName" className="text-sm text-richblack-5">
            Category Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="categoryName"
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-style"
          />
        </div>

        {/* Category Description */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="categoryDesc" className="text-sm text-richblack-5">
            Category Description
          </label>
          <textarea
            id="categoryDesc"
            placeholder="Enter category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-style min-h-[100px]"
          />
        </div>

        <div className="flex justify-end">
          <IconBtn disabled={loading} text="Create Category" />
        </div>
      </form>
    </div>
  )
}
