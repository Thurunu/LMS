import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  BookOpen,
  TrendingUp,
  Plus,
  Trash2,
  X,
  LayoutDashboard,
  GraduationCap,
  BarChart3,
  Activity,
  UserCheck,
  Clock,
  Award,
} from "lucide-react";
import authService from "../services/authService";
import courseService from "../services/courseService";
import studentService from "../services/studentService";
import StudentTab from "../components/admin/StudentTab";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    courseCode: "",
    courseName: "",
    description: "",
    instructor: "",
    credits: "",
  });

  useEffect(() => {
    // Check if user is admin
    if (!authService.isAdmin()) {
      navigate("/");
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const user = authService.getCurrentUser();

      if (!token) {
        console.error("No authentication token found");
        alert("You are not logged in. Please login as admin.");
        navigate("/signin");
        return;
      }

      const [studentsData, coursesData] = await Promise.all([
        studentService.getAllStudents(),
        courseService.getAllCourses(),
      ]);

      setStudents(studentsData);
      setCourses(coursesData);

      // Calculate stats
      const totalEnrollments = studentsData.reduce((acc, student) => {
        return acc + (student.enrolledCourses?.length || 0);
      }, 0);

      setStats({
        totalStudents: studentsData.length,
        totalCourses: coursesData.length,
        totalEnrollments,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        alert("Authentication failed. Please login as admin.");
        authService.logout();
        navigate("/signin");
      } else {
        alert(
          "Error loading dashboard data: " + (error.message || "Unknown error")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await courseService.createCourse(newCourse);
      setShowAddCourse(false);
      setNewCourse({
        courseCode: "",
        courseName: "",
        description: "",
        instructor: "",
        credits: "",
      });
      fetchData();
      alert("Course added successfully!");
    } catch (error) {
      alert("Error adding course: " + error.message);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await courseService.deleteCourse(courseId);
        fetchData();
        alert("Course deleted successfully!");
      } catch (error) {
        alert("Error deleting course: " + error.message);
      }
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await studentService.deleteStudent(studentId);
        fetchData();
        alert("Student deleted successfully!");
      } catch (error) {
        alert("Error deleting student: " + error.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1D6E61] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-12 px-6 relative overflow-hidden">
        {/* Decorative Icons */}
        <div className="absolute top-8 left-8 text-[#1D6E61]">
          <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <LayoutDashboard className="w-10 h-10" />
          </div>
        </div>

        <div className="absolute top-8 right-8 text-[#EAB141]">
          <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <BarChart3 className="w-10 h-10" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#1D6E61]/10 text-[#1D6E61] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Admin Panel
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-[#1D6E61]">Admin</span>{" "}
            <span className="text-[#EAB141]">Dashboard</span>
          </h1>

          <p className="text-gray-600 text-lg italic max-w-2xl mx-auto">
            Welcome back, {authService.getCurrentUser()?.email?.split("@")[0]}!
            Manage your platform efficiently.
          </p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="px-6 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#1D6E61] hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    Total Students
                  </p>
                  <p className="text-4xl font-bold text-[#1D6E61]">
                    {stats.totalStudents}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Registered users</p>
                </div>
                <div className="w-16 h-16 bg-[#1D6E61]/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#1D6E61]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#EAB141] hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    Total Courses
                  </p>
                  <p className="text-4xl font-bold text-[#EAB141]">
                    {stats.totalCourses}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Available courses
                  </p>
                </div>
                <div className="w-16 h-16 bg-[#EAB141]/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-[#EAB141]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    Total Enrollments
                  </p>
                  <p className="text-4xl font-bold text-green-600">
                    {stats.totalEnrollments}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Active enrollments
                  </p>
                </div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Tabs */}
            <div className="border-b">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`flex items-center gap-2 px-8 py-4 font-semibold transition-colors ${
                    activeTab === "overview"
                      ? "border-b-4 border-[#1D6E61] text-[#1D6E61]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("students")}
                  className={`flex items-center gap-2 px-8 py-4 font-semibold transition-colors ${
                    activeTab === "students"
                      ? "border-b-4 border-[#1D6E61] text-[#1D6E61]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Students
                </button>
                <button
                  onClick={() => setActiveTab("courses")}
                  className={`flex items-center gap-2 px-8 py-4 font-semibold transition-colors ${
                    activeTab === "courses"
                      ? "border-b-4 border-[#1D6E61] text-[#1D6E61]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  Courses
                </button>
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      <span className="text-[#1D6E61]">System</span>{" "}
                      <span className="text-[#EAB141]">Overview</span>
                    </h2>
                    <p className="text-gray-600">
                      Welcome to the admin dashboard. Here you can manage
                      students and courses efficiently.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Recent Activity Card */}
                    <div className="bg-gradient-to-br from-[#1D6E61]/5 to-[#EAB141]/5 rounded-2xl p-6 border-2 border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#1D6E61] rounded-full flex items-center justify-center">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Recent Activity</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <UserCheck className="w-4 h-4 text-green-500" />
                          <span>{stats.totalStudents} students registered</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <BookOpen className="w-4 h-4 text-[#EAB141]" />
                          <span>{stats.totalCourses} courses available</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions Card */}
                    <div className="bg-gradient-to-br from-[#EAB141]/5 to-[#1D6E61]/5 rounded-2xl p-6 border-2 border-gray-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#EAB141] rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold">Quick Actions</h3>
                      </div>
                      <div className="space-y-3">
                        <button
                          onClick={() => setActiveTab("courses")}
                          className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 rounded-xl transition-colors text-left border-2 border-gray-100 hover:border-[#1D6E61]"
                        >
                          <Plus className="w-5 h-5 text-[#1D6E61]" />
                          <span className="font-medium">Add New Course</span>
                        </button>
                        <button
                          onClick={() => setActiveTab("students")}
                          className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 rounded-xl transition-colors text-left border-2 border-gray-100 hover:border-[#1D6E61]"
                        >
                          <Users className="w-5 h-5 text-[#1D6E61]" />
                          <span className="font-medium">View All Students</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Students Tab */}
              {activeTab === "students" && (
                <StudentTab
                  students={students}
                  handleDeleteStudent={handleDeleteStudent}
                />
              )}

              {/* Courses Tab */}
              {activeTab === "courses" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">
                        <span className="text-[#1D6E61]">Courses</span>{" "}
                        <span className="text-[#EAB141]">Management</span>
                      </h2>
                      <p className="text-gray-600">
                        {courses.length} available courses
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddCourse(true)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                    >
                      <Plus className="w-5 h-5" />
                      Add Course
                    </button>
                  </div>

                  {/* Add Course Form */}
                  {showAddCourse && (
                    <div className="bg-gradient-to-br from-[#1D6E61]/5 to-[#EAB141]/5 rounded-2xl p-8 mb-8 border-2 border-gray-100">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold">Add New Course</h3>
                        <button
                          onClick={() => setShowAddCourse(false)}
                          className="p-2 hover:bg-white rounded-lg transition-colors"
                        >
                          <X className="w-6 h-6 text-gray-600" />
                        </button>
                      </div>
                      <form
                        onSubmit={handleAddCourse}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Code
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., CS101"
                            value={newCourse.courseCode}
                            onChange={(e) =>
                              setNewCourse({
                                ...newCourse,
                                courseCode: e.target.value,
                              })
                            }
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1D6E61] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., Introduction to Programming"
                            value={newCourse.courseName}
                            onChange={(e) =>
                              setNewCourse({
                                ...newCourse,
                                courseName: e.target.value,
                              })
                            }
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1D6E61] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Instructor Name
                          </label>
                          <input
                            type="text"
                            placeholder="e.g., John Doe"
                            value={newCourse.instructor}
                            onChange={(e) =>
                              setNewCourse({
                                ...newCourse,
                                instructor: e.target.value,
                              })
                            }
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1D6E61] transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Credits
                          </label>
                          <input
                            type="number"
                            placeholder="e.g., 3"
                            value={newCourse.credits}
                            onChange={(e) =>
                              setNewCourse({
                                ...newCourse,
                                credits: e.target.value,
                              })
                            }
                            required
                            min="1"
                            max="12"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1D6E61] transition-colors"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course Description
                          </label>
                          <textarea
                            placeholder="Describe the course content and objectives..."
                            value={newCourse.description}
                            onChange={(e) =>
                              setNewCourse({
                                ...newCourse,
                                description: e.target.value,
                              })
                            }
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1D6E61] transition-colors"
                            rows="4"
                          />
                        </div>
                        <div className="md:col-span-2 flex gap-4">
                          <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                          >
                            Add Course
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAddCourse(false)}
                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Courses Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.length === 0 ? (
                      <div className="col-span-full text-center py-12">
                        <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-gray-500">No courses available</p>
                      </div>
                    ) : (
                      courses.map((course) => (
                        <div
                          key={course.id || course._id}
                          className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#1D6E61] hover:shadow-xl transition-all"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-xl text-gray-800 flex-1">
                              {course.courseName}
                            </h3>
                            <span className="bg-[#1D6E61] text-white px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap ml-2">
                              {course.courseCode}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mb-3 text-gray-600">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {(course.instructor || "I")[0].toUpperCase()}
                            </div>
                            <span className="text-sm font-medium">
                              {course.instructor}
                            </span>
                          </div>

                          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                            {course.description}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t">
                            <span className="text-[#1D6E61] font-bold text-lg flex items-center gap-1">
                              <GraduationCap className="w-5 h-5" />
                              {course.credits} Credits
                            </span>
                            <button
                              onClick={() =>
                                handleDeleteCourse(course.id || course._id)
                              }
                              className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
