import axios from "axios";

const API = axios.create({
  baseURL: "https://anurag910955-trueigtech-task-instagram.onrender.com"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default API;
