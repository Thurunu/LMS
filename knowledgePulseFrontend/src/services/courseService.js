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

// Course Services
const courseService = {
  // Get all courses (Public)
  getAllCourses: async (params) => {
    try {
      const response = await api.get("/courses", { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get course by ID (Public)
  getCourseById: async (id) => {
    try {
      const response = await api.get(`/courses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create new course (Admin only)
  createCourse: async (courseData) => {
    try {
      const response = await api.post("/courses", courseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update course (Admin only)
  updateCourse: async (id, courseData) => {
    try {
      const response = await api.put(`/courses/${id}`, courseData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete course (Admin only)
  deleteCourse: async (id) => {
    try {
      const response = await api.delete(`/courses/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get courses by category (Public)
  getCoursesByCategory: async (category) => {
    try {
      const response = await api.get(`/courses/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Search courses (Public)
  searchCourses: async (searchQuery) => {
    try {
      const response = await api.get("/courses/search", {
        params: { q: searchQuery },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get popular courses (Public)
  getPopularCourses: async (limit = 10) => {
    try {
      const response = await api.get("/courses/popular", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get featured courses (Public)
  getFeaturedCourses: async () => {
    try {
      const response = await api.get("/courses/featured");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get course categories (Public)
  getCategories: async () => {
    try {
      const response = await api.get("/courses/categories");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get course lessons/modules
  getCourseLessons: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}/lessons`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single lesson
  getLesson: async (courseId, lessonId) => {
    try {
      const response = await api.get(
        `/courses/${courseId}/lessons/${lessonId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add lesson to course (Admin only)
  addLesson: async (courseId, lessonData) => {
    try {
      const response = await api.post(
        `/courses/${courseId}/lessons`,
        lessonData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update lesson (Admin only)
  updateLesson: async (courseId, lessonId, lessonData) => {
    try {
      const response = await api.put(
        `/courses/${courseId}/lessons/${lessonId}`,
        lessonData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete lesson (Admin only)
  deleteLesson: async (courseId, lessonId) => {
    try {
      const response = await api.delete(
        `/courses/${courseId}/lessons/${lessonId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get course reviews
  getCourseReviews: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}/reviews`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Add review (Student only)
  addReview: async (courseId, reviewData) => {
    try {
      const response = await api.post(
        `/courses/${courseId}/reviews`,
        reviewData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update review (Student only, own review)
  updateReview: async (courseId, reviewId, reviewData) => {
    try {
      const response = await api.put(
        `/courses/${courseId}/reviews/${reviewId}`,
        reviewData
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete review (Student only, own review)
  deleteReview: async (courseId, reviewId) => {
    try {
      const response = await api.delete(
        `/courses/${courseId}/reviews/${reviewId}`
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get enrolled students in a course (Admin only)
  getEnrolledStudents: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}/students`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Upload course thumbnail (Admin only)
  uploadCourseThumbnail: async (courseId, formData) => {
    try {
      const response = await api.post(
        `/courses/${courseId}/thumbnail`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get course statistics (Admin only)
  getCourseStats: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}/stats`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get all course statistics (Admin only)
  getAllCourseStats: async () => {
    try {
      const response = await api.get("/courses/stats/all");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get instructor courses (Instructor only)
  getInstructorCourses: async (instructorId) => {
    try {
      const response = await api.get(`/instructors/${instructorId}/courses`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Filter courses
  filterCourses: async (filters) => {
    try {
      const response = await api.get("/courses/filter", { params: filters });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default courseService;
