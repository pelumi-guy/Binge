import axios from "axios";

// const baseURL= "https://binge-backend.onrender.com"
// export default axios.create({
// baseURL,
// });

const liveBaseURL = "https://binge-api.azurewebsites.net";
const localBaseURL = "https://localhost:7253/";

const axiosInstance = axios.create({
  baseURL: liveBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to set the Authorization header for every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace with your actual token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // config.timeout = 10000;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.defaults.timeout = 20000;

export default axiosInstance;
