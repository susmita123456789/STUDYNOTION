// import { endpoints } from "../apis/endpoints";
// CREATE_CATEGORY_API: BASE_URL + "/category/create",
// import { apiConnector } from "../apiConnector"; // if you have a common axios wrapper
// import { apiConnector } from "../apiconnector"

// export const createCategory = async (categoryData, token) => {
//   try {
//     const response = await fetch("http://localhost:4000/api/v1/course/createCategory", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,  // if your API requires auth
//       },
//       body: JSON.stringify(categoryData),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Failed to create category");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error creating category:", error);
//     return null;
//   }
// };




import { apiConnector } from "../apiconnector";
// import { endpoints } from "../apis"; // ✅ because apis.js is directly inside services

// const { CREATE_CATEGORY_API } = endpoints;

export const createCategory = async (categoryData, token) => {
  try {
    const response = await apiConnector(
      "POST",
      // CREATE_CATEGORY_API,
      "https://studynotion-0cem.onrender.com/api/v1/course/createCategory",
      categoryData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating category:", error.response?.data || error.message);
    return null;
  }
};
