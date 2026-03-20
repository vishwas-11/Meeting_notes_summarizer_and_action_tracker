import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});



// Create meeting
export const createMeeting = (data) =>
  API.post("/meetings/create", data);

// Process meeting (AI)
export const processMeeting = (id) =>
  API.post(`/meetings/process/${id}`);

// Get all meetings
export const getMeetings = () =>
  API.get("/meetings");

// Get single meeting
export const getMeeting = (id) =>
  API.get(`/meetings/${id}`);




// Get all action items
export const getActions = () =>
  API.get("/actions");

// Update action item (PATCH)
export const updateAction = (id, data) =>
  API.patch(`/actions/${id}`, data);


export const uploadMeeting = (formData) =>
  fetch("http://localhost:8000/meetings/upload", {
    method: "POST",
    body: formData,
  });

export default API;