import { useEffect, useState } from "react";
import authService from "../services/authService";
import courseService from "../services/courseService";
import studentService from "../services/studentService";

// Hook for authentication
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setIsAuthenticated(authService.isAuthenticated());
    setIsAdmin(authService.isAdmin());
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    setIsAuthenticated(true);
    setIsAdmin(data.user.role === "admin");
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data.user);
    setIsAuthenticated(true);
    setIsAdmin(data.user.role === "admin");
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    register,
    logout,
  };
};

// Hook for fetching data with loading and error states
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

// Hook for student data
export const useStudent = () => {
  const [profile, setProfile] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMyProfile = async () => {
    setLoading(true);
    try {
      const data = await studentService.getMyProfile();
      setProfile(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updateData) => {
    setLoading(true);
    try {
      const data = await studentService.updateMyProfile(updateData);
      setProfile(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getEnrolledCourses = async () => {
    setLoading(true);
    try {
      const data = await studentService.getMyEnrolledCourses();
      setEnrolledCourses(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId) => {
    setLoading(true);
    try {
      const data = await studentService.enrollInCourse(courseId);
      await getEnrolledCourses(); // Refresh enrolled courses
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    enrolledCourses,
    loading,
    getMyProfile,
    updateProfile,
    getEnrolledCourses,
    enrollInCourse,
  };
};

// Hook for courses
export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllCourses = async (params) => {
    setLoading(true);
    try {
      const data = await courseService.getAllCourses(params);
      setCourses(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const searchCourses = async (query) => {
    setLoading(true);
    try {
      const data = await courseService.searchCourses(query);
      setCourses(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getCoursesByCategory = async (category) => {
    setLoading(true);
    try {
      const data = await courseService.getCoursesByCategory(category);
      setCourses(data);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    courses,
    loading,
    getAllCourses,
    searchCourses,
    getCoursesByCategory,
  };
};
