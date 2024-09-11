import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Add token to headers if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    console.error("API Error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;

/**
 * Same Use for Get with params
 * apiClient.get("/users", {
 *  params: {
 *   page: 1,
 *  limit: 10,
 * },
 * });
 */

/**
 * Same Use for Post with data
 * apiClient.post("/users", {
 * name: "John Doe",
 * email: "",
 * });
 */

/**
 * Same Use for Put with data
 * apiClient.put("/users/1", {
 * name: "John Doe",
 * email: "",
 * });
 */

/**
 * Same Use for Delete with data
 * apiClient.delete("/users/1");
 */
