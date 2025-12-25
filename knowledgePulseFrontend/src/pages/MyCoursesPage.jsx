import {
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  PlayCircle,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { courseImages, instructorImages } from "../services/assets";
import studentService from "../services/studentService";

const MyCoursesPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchEnrolledCourses();
    fetchStudentProfile();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const courses = await studentService.getMyEnrolledCourses();
      setEnrolledCourses(courses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentProfile = async () => {
    try {
      const profile = await studentService.getMyProfile();
      setCurrentUser(profile);
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

  // Calculate stats
  const completedCourses = enrolledCourses.filter(
    (course) => course.progress === 100
  ).length;
  const inProgressCourses = enrolledCourses.filter(
    (course) => course.progress > 0 && course.progress < 100
  ).length;
  const totalCourses = enrolledCourses.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Decorative Icons */}
        <div className="absolute top-8 left-8 text-[#1D6E61]">
          <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <BookOpen className="w-10 h-10" />
          </div>
        </div>

        <div className="absolute top-8 right-8 text-[#EAB141]">
          <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <Award className="w-10 h-10" />
          </div>
        </div>

        <div className="absolute bottom-8 left-8 text-[#1D6E61]">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
            <TrendingUp className="w-10 h-10" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#1D6E61]/10 text-[#1D6E61] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            My Learning Dashboard
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-[#1D6E61]">Welcome Back,</span>
            <br />
            <span className="text-[#EAB141]">
              {currentUser?.firstName + " " + currentUser?.lastName ||
                "Student"}
              !
            </span>
          </h1>

          <p className="text-gray-600 text-lg italic max-w-2xl mx-auto">
            Continue your learning journey and achieve your goals
          </p>
        </div>
      </section>

      {/* Stats Section */}
      {!loading && enrolledCourses.length > 0 && (
        <section className="px-6 -mt-8 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#1D6E61]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">
                      Total Courses
                    </p>
                    <p className="text-3xl font-bold text-[#1D6E61]">
                      {totalCourses}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-[#1D6E61]/10 rounded-full flex items-center justify-center">
                    <BookOpen className="w-7 h-7 text-[#1D6E61]" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#EAB141]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">
                      In Progress
                    </p>
                    <p className="text-3xl font-bold text-[#EAB141]">
                      {inProgressCourses}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-[#EAB141]/10 rounded-full flex items-center justify-center">
                    <Clock className="w-7 h-7 text-[#EAB141]" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">
                      Completed
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {completedCourses}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* My Learning Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <h2 className="text-4xl font-bold mb-8">
              <span className="text-[#1D6E61]">My</span>{" "}
              <span className="text-[#EAB141]">Learning</span>
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1D6E61] mx-auto"></div>
                <p className="mt-4 text-gray-600 font-medium">
                  Loading your courses...
                </p>
              </div>
            ) : enrolledCourses.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Courses Yet
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  You haven't enrolled in any courses yet. Start your learning
                  journey today!
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <BookOpen className="w-5 h-5" />
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {enrolledCourses.map((course, idx) => {
                  const courseImg =
                    course.image ||
                    (courseImages && courseImages.length
                      ? courseImages[idx % courseImages.length]
                      : `https://via.placeholder.com/400x250/1D6E61/FFFFFF?text=${encodeURIComponent(
                          course.courseName || "Course"
                        )}`);
                  const instructorImg =
                    instructorImages && instructorImages.length
                      ? instructorImages[idx % instructorImages.length]
                      : null;

                  return (
                    <div
                      key={course.id || course._id}
                      className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-[#1D6E61] hover:shadow-xl transition-all duration-300 group"
                    >
                      {/* Course Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={courseImg}
                          alt={course.courseName || course.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              (course.progress || 0) === 100
                                ? "bg-green-500 text-white"
                                : (course.progress || 0) > 0
                                ? "bg-[#EAB141] text-white"
                                : "bg-gray-500 text-white"
                            }`}
                          >
                            {(course.progress || 0) === 100
                              ? "Completed"
                              : (course.progress || 0) > 0
                              ? "In Progress"
                              : "Not Started"}
                          </div>
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="p-5">
                        {/* Instructor */}
                        <div className="flex items-center gap-2 mb-3">
                          {instructorImg ? (
                            <img
                              src={instructorImg}
                              alt={course.instructor || "Instructor"}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {(course.instructor || "I")[0].toUpperCase()}
                            </div>
                          )}
                          <span className="text-sm text-gray-600 font-medium">
                            {course.instructor || "Instructor"}
                          </span>
                        </div>

                        {/* Course Title */}
                        <h3 className="font-bold text-lg mb-3 text-gray-800 line-clamp-2 min-h-[3.5rem]">
                          {course.courseName || course.title}
                        </h3>

                        {/* Course Info */}
                        <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>
                              {course.lessons || course.credits || "N/A"}{" "}
                              lessons
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600 font-medium">
                              Progress
                            </span>
                            <span className="text-[#1D6E61] font-bold">
                              {course.progress || 0}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#1D6E61] to-[#EAB141] h-2.5 rounded-full transition-all duration-500"
                              style={{ width: `${course.progress || 0}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <Link
                          to={`/course/${course.id || course._id}`}
                          className="block w-full text-center bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white py-2.5 rounded-xl font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all group"
                        >
                          <span className="inline-flex items-center gap-2">
                            <PlayCircle className="w-4 h-4" />
                            {(course.progress || 0) === 0
                              ? "Start Course"
                              : "Continue Learning"}
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyCoursesPage;
