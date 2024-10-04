import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/api", // Set your base URL here
    timeout: 10000, // Optional: set a timeout for requests
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default api;