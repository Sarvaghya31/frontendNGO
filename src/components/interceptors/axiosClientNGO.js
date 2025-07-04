// axiosClient.js
import axios from "axios";

const axiosClientNGO = axios.create({
  baseURL: "/api", // change this to your actual API
  withCredentials: true, // sends cookies including refreshToken
});

// Setup interceptor to handle expired tokens
axiosClientNGO.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If accessToken expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // This will call the refreshToken route
        await axios.get("/api/NGO/refreshAccessTokenNGO", { withCredentials: true });

        // Retry the original request
        return axiosClientNGO(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClientNGO;


// import axiosClient from './axiosClient';

// const fetchUserData = async () => {
//   const res = await axiosClient.get('/user/details');
//   console.log(res.data); // your protected data
// };
