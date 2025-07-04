// axiosClient.js
import axios from "axios";

const axiosClientUser = axios.create({
  baseURL: "/api", 
  withCredentials: true,
});

// Setup interceptor to handle expired tokens
axiosClientUser.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If accessToken expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // This will call the refreshToken route
        await axios.get("/api/users/refreshTokenUser", { withCredentials: true });

        // Retry the original request
        return axiosClientUser(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClientUser;


