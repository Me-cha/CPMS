// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8080",
// });

// API.interceptors.request.use((req) => {
//   if (localStorage.getItem("Profile")) {
//     req.headers.authorization = `Bearer ${
//       JSON.parse(localStorage.getItem("Profile")).token
//     }`;
//   }
//   return req;
// });

// // authentication
// export const logIn = (authData) => API.post("/api/user/login", authData);
// // export const signUp = (authData) =>
// //   API.post("/api/user/signup", authData).catch((error) => {
// //     console.error("Error during signup:", error);
// //   });
