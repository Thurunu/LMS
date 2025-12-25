import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:8080/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
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

// Student Services
const studentService = {
  // Get all students (Admin only)
  getAllStudents: async () => {
    try {
      const response = await api.get("/students");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get student by ID (Admin or own profile)
  getStudentById: async (id) => {
    try {
      const response = await api.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get current student profile
  getMyProfile: async () => {
    try {
      const response = await api.get("/students/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update student profile (Student can update own profile)
  updateStudent: async (id, updateData) => {
    try {
      const response = await api.put(`/students/${id}`, updateData);
      // Update local storage if updating own profile
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user.id === id) {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, ...response.data })
        );
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update own profile
  updateMyProfile: async (updateData) => {
    try {
      const response = await api.put("/students/me", updateData);
      // Update local storage
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, ...response.data })
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete student (Admin only)
  deleteStudent: async (id) => {
    try {
      const response = await api.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get student enrolled courses
  getEnrolledCourses: async (studentId) => {
    try {
      const response = await api.get(`/students/${studentId}/courses`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get my enrolled courses
  getMyEnrolledCourses: async () => {
    try {
      const response = await api.get("/students/me/courses");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Enroll in a course
  enrollInCourse: async (courseId) => {
    try {
      const response = await api.post("/students/me/enroll", { courseId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Unenroll from a course
  unenrollFromCourse: async (courseId) => {
    try {
      const response = await api.post("/students/me/unenroll", { courseId });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get student progress in a course
  getCourseProgress: async (courseId) => {
    try {
      const response = await api.get(
        `/students/me/courses/${courseId}/progress`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update course progress
  updateCourseProgress: async (courseId, progressData) => {
    try {
      const response = await api.put(
        `/students/me/courses/${courseId}/progress`,
        progressData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (formData) => {
    try {
      const response = await api.post(
        "/students/me/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Update local storage
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          profilePicture: response.data.profilePicture,
        })
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get student statistics (Admin only)
  getStudentStats: async () => {
    try {
      const response = await api.get("/students/stats");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search students (Admin only)
  searchStudents: async (searchParams) => {
    try {
      const response = await api.get("/students/search", {
        params: searchParams,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default studentService;
