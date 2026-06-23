import axios from "axios";

const api = axios.create({
  baseURL: "https://reclog-backend.onrender.com" || "http://127.0.0.1:8000",
});

export default api;