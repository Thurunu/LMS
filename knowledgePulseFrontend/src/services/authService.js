import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:8080/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

// Helper function to decode JWT token
const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

// Authentication Services
const authService = {
  // Register new user
  register: async (userData) => {
    try {
      const userCredentials = {
        username: userData.email,
        password: userData.password,
        role: "STUDENT",
      };
      console.log("Registering user with data:", userData);
      console.log("User credentials for registration:", userCredentials);
      const response = await api.post("/auth/register", userCredentials);
      console.log("Registration response:", response.data);
      // Backend returns object with token field, not plain string
      const token = response.data.token || response.data;
      console.log("Registration token:", token);
      if (token) {
        // Save token first so other code can read it if needed
        localStorage.setItem("token", token);
        // Decode JWT to get basic user info
        const decoded = decodeJWT(token);
        let user = null;
        if (decoded) {
          user = {
            email: decoded.sub,
            role: decoded.role?.toLowerCase() || "student",
          };
          localStorage.setItem("user", JSON.stringify(user));
        }

        // Use the registration token to create the student details record.
        // We explicitly pass the token so the request uses the freshly-issued token.
        try {
          const created = await setStudentDetails(userData, token);
          if (created) {
            // Merge created student details into stored user object
            const merged = { ...user, ...created };
            localStorage.setItem("user", JSON.stringify(merged));
          }
        } catch (err) {
          console.error(
            "Failed to set student details after registration:",
            err
          );
        }
      }
      return { token };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      // Backend expects username field (which is email)
      const loginData = {
        username: credentials.email || credentials.username,
        password: credentials.password,
      };
      console.log("Attempting login with:", { username: loginData.username });

      const response = await api.post("/auth/login", loginData);
      console.log("Login response:", response.data);

      // Backend now returns RegistrationResponse object with token field
      const token = response.data.token;
      const username = response.data.username;
      const role = response.data.role;

      console.log("Extracted from response:", {
        token: token ? "exists" : "missing",
        username,
        role,
      });

      if (token) {
        localStorage.setItem("token", token);
        const user = {
          email: username,
          role: role?.toLowerCase() || "student",
        };
        console.log("Stored user:", user);
        localStorage.setItem("user", JSON.stringify(user));
        return { token, user };
      }
      return { token };
    } catch (error) {
      console.error("Login error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message,
      });
      throw error.response?.data || error.message;
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  // Check if user is admin
  isAdmin: () => {
    const user = authService.getCurrentUser();
    // Check for both 'admin' and 'ADMIN' (case-insensitive)
    return user?.role?.toLowerCase() === "admin";
  },

  // Verify token
  verifyToken: async () => {
    try {
      const response = await api.get("/auth/verify");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Request password reset
  forgotPassword: async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post("/auth/reset-password", {
        token,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Change password
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await api.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

const setStudentDetails = async (userDetails, token) => {
  const userData = {
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    phone: userDetails.phone || "",

    address: userDetails.address || "",
    highestEducation: userDetails.highestEducation || "",
  };
  console.log("User token for student details:", token);
  console.log("User data for details:", userData);
  try {
    // Use raw axios with full URL to bypass the api instance interceptors
    const usernameParam = encodeURIComponent(
      userDetails.email || userDetails.username || ""
    );
    const response = await axios.post(
      `${API_URL}/students?username=${usernameParam}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    // Log the error but do NOT throw - we want registration to remain on the page
    console.error(
      "Error setting student details (non-fatal):",
      error.response?.data || error.message || error
    );
    return null;
  }
};
export default authService;
