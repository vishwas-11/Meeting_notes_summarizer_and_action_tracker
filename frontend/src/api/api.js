// import axios from "axios";

// // const API = axios.create({
// //   baseURL: "http://localhost:8000",
// // });

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });


// // Create meeting
// export const createMeeting = (data) =>
//   API.post("/meetings/create", data);

// // Process meeting (AI)
// export const processMeeting = (id) =>
//   API.post(`/meetings/process/${id}`);

// // Get all meetings
// export const getMeetings = () =>
//   API.get("/meetings");

// // Get single meeting
// export const getMeeting = (id) =>
//   API.get(`/meetings/${id}`);




// // Get all action items
// export const getActions = () =>
//   API.get("/actions");

// // Update action item (PATCH)
// export const updateAction = (id, data) =>
//   API.patch(`/actions/${id}`, data);


// // export const uploadMeeting = (formData) =>
// //   fetch("http://localhost:8000/meetings/upload", {
// //     method: "POST",
// //     body: formData,
// //   });


// export const uploadMeeting = (formData) =>
//   fetch(`${import.meta.env.VITE_API_URL}/meetings/upload`, {
//     method: "POST",
//     body: formData,
//   });

// export default API;



import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


// const API = axios.create({
//     baseURL: "http://localhost:8000",
//   });

// ✅ Attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// -------------------- API CALLS --------------------

// 🔹 AUTH (you’ll need these if not already)
export const loginUser = (data) =>
  API.post("/auth/login", data);

export const signupUser = (data) =>
  API.post("/auth/signup", data);

// -------------------- MEETINGS --------------------

// Create meeting
export const createMeeting = (data) =>
  API.post("/meetings/create", data);

// Process meeting (AI)
export const processMeeting = (id) =>
  API.post(`/meetings/process/${id}`);

// Get all meetings
export const getMeetings = () =>
  API.get("/meetings/");   // ✅ trailing slash (FastAPI consistency)

// Get single meeting
export const getMeeting = (id) =>
  API.get(`/meetings/${id}`);

// Upload meeting
export const uploadMeeting = (formData) =>
  API.post("/meetings/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// -------------------- ACTIONS --------------------

// Get all action items
export const getActions = (params = {}) =>
  API.get("/actions/", { params }); // ✅ supports filters

// Update action item
export const updateAction = (id, data) =>
  API.patch(`/actions/${id}`, data);

export default API;