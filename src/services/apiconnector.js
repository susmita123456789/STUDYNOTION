// import axios from "axios"

// export const axiosInstance = axios.create({});

// export const apiConnector = (method, url, bodyData, headers, params) => {
//     return axiosInstance({
//         method:`${method}`,
//         url:`${url}`,
//         data: bodyData ? bodyData : null,
//         headers: headers ? headers: null,
//         params: params ? params : null,
//     });
// }





// export const apiConnector = (method, url, bodyData, headers = {}, params) => {
//   return axiosInstance({
//     method,
//     url,
//     data: bodyData || null,
//     headers: {
//       ...headers, // ✅ merge your Authorization with existing headers
//       // ⚠️ DO NOT manually set Content-Type here! Let Axios handle it
//     },
//     params: params || null,
//   });
// };




import axios from "axios";

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData = null, headers = {}, params = null) => {
  return axiosInstance({
    method,
    url,
    data: bodyData, // can be JSON or FormData
    // ✅ merge any passed headers (like Authorization) with defaults
    headers: {
      ...headers,
      // ❌ do NOT set Content-Type manually for FormData
      // Axios will automatically detect multipart/form-data when bodyData is FormData
    },
    params,
  });
};
