import {
  AlertCircle,
  ArrowLeft,
  Award,
  BarChart,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RelatedCourses from "../components/course/RelatedCourses";
import authService from "../services/authService";
import courseService from "../services/courseService";
import studentService from "../services/studentService";
import { courseImages } from "../services/assets";

const CourseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchCourseDetails();
    fetchRelatedCourses();
    checkEnrollmentStatus();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const data = await courseService.getCourseById(id);
      setCourse(data);
    } catch (error) {
      console.error("Error fetching course:", error);
      alert("Failed to load course details");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      const filtered = data.filter((c) => c.id !== parseInt(id));
      setRelatedCourses(filtered.slice(0, 4));
    } catch (error) {
      console.error("Error fetching related courses:", error);
    }
  };

  const checkEnrollmentStatus = async () => {
    if (!authService.isAuthenticated()) return;

    try {
      const enrolledCourses = await studentService.getMyEnrolledCourses();
      const enrolled = enrolledCourses.some((c) => c.id === parseInt(id));
      setIsEnrolled(enrolled);
    } catch (error) {
      console.error("Error checking enrollment:", error);
    }
  };

  // Choose a course image: prefer course.image, fall back to a deterministic image from `courseImages`, then external placeholder
  const getCourseImage = (courseObj) => {
    if (!courseObj) return null;
    if (courseObj.image) return courseObj.image;
    if (courseImages && courseImages.length > 0) {
      const idNum = parseInt(courseObj.id);
      const idx =
        Number.isFinite(idNum) && !isNaN(idNum)
          ? Math.abs(idNum) % courseImages.length
          : 0;
      return courseImages[idx];
    }
    return `https://via.placeholder.com/600x800/1D6E61/FFFFFF?text=${encodeURIComponent(
      courseObj.courseName || "Course"
    )}`;
  };

  const handleEnroll = async () => {
    if (!authService.isAuthenticated()) {
      navigate("/signin");
      return;
    }

    if (authService.isAdmin()) {
      alert("Admin users cannot enroll in courses");
      return;
    }

    setEnrolling(true);
    try {
      await studentService.enrollInCourse(parseInt(id));
      setIsEnrolled(true);
      alert("Successfully enrolled in the course!");
    } catch (error) {
      console.error("Error enrolling:", error);
      alert(
        "Failed to enroll in course: " + (error.message || "Unknown error")
      );
    } finally {
      setEnrolling(false);
    }
  };

  const handleUnenroll = async () => {
    if (!window.confirm("Are you sure you want to unenroll from this course?"))
      return;

    setEnrolling(true);
    try {
      await studentService.unenrollFromCourse(parseInt(id));
      setIsEnrolled(false);
      alert("Successfully unenrolled from the course");
    } catch (error) {
      console.error("Error unenrolling:", error);
      alert(
        "Failed to unenroll from course: " + (error.message || "Unknown error")
      );
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1D6E61] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading course details...
          </p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-md mx-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Course Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </button>
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
            <BookOpen className="w-10 h-10" />
          </div>
        </div>

        <div className="absolute top-8 right-8 text-[#EAB141]">
          <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <Award className="w-10 h-10" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate("/courses")}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#1D6E61] mb-6 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </button>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-3 gap-0">
              {/* Left: Course Image */}
              <div className="md:col-span-1 relative">
                <img
                  src={getCourseImage(course)}
                  alt={course.courseName}
                  className="w-full h-full object-cover min-h-[300px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                {/* Status Badge */}
                {isEnrolled && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Enrolled
                  </div>
                )}
              </div>

              {/* Right: Course Info */}
              <div className="md:col-span-2 p-8 md:p-12">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 bg-[#1D6E61]/10 text-[#1D6E61] px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <BookOpen className="w-4 h-4" />
                  {course.courseCode || "Course"}
                </div>

                {/* Course Title */}
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  {course.courseName}
                </h1>

                {/* Instructor */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-full flex items-center justify-center text-white text-lg font-bold">
                    {(course.instructor || "I")[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Instructor</p>
                    <p className="font-semibold text-gray-800">
                      {course.instructor || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-5 h-5 text-[#1D6E61]" />
                      <span className="text-sm text-gray-600">Credits</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      {course.credits || "N/A"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-5 h-5 text-[#1D6E61]" />
                      <span className="text-sm text-gray-600">Students</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      {course.enrolledStudents || "0"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-5 h-5 text-[#EAB141]" />
                      <span className="text-sm text-gray-600">Rating</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      {course.rating || "4.5"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <BarChart className="w-5 h-5 text-[#1D6E61]" />
                      <span className="text-sm text-gray-600">Level</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      {course.level || "All"}
                    </p>
                  </div>
                </div>

                {/* Enrollment Buttons */}
                <div className="flex gap-4">
                  {isEnrolled ? (
                    <>
                      <button
                        onClick={() => navigate("/my-courses")}
                        className="flex-1 bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2"
                      >
                        <PlayCircle className="w-5 h-5" />
                        Continue Learning
                      </button>
                      <button
                        onClick={handleUnenroll}
                        disabled={enrolling}
                        className="px-6 py-4 border-2 border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition-all disabled:opacity-50"
                      >
                        {enrolling ? "Processing..." : "Unenroll"}
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleEnroll}
                      disabled={enrolling}
                      className="flex-1 bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white px-6 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <CheckCircle className="w-5 h-5" />
                      {enrolling ? "Enrolling..." : "Enroll Now"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Tabs */}
            <div className="border-b">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`px-8 py-4 font-semibold transition-colors ${
                    activeTab === "overview"
                      ? "border-b-4 border-[#1D6E61] text-[#1D6E61]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("curriculum")}
                  className={`px-8 py-4 font-semibold transition-colors ${
                    activeTab === "curriculum"
                      ? "border-b-4 border-[#1D6E61] text-[#1D6E61]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Curriculum
                </button>
                <button
                  onClick={() => setActiveTab("requirements")}
                  className={`px-8 py-4 font-semibold transition-colors ${
                    activeTab === "requirements"
                      ? "border-b-4 border-[#1D6E61] text-[#1D6E61]"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Requirements
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-8 md:p-12">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                      <FileText className="w-8 h-8 text-[#1D6E61]" />
                      Course Description
                    </h2>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {course.description ||
                        "No description available for this course."}
                    </p>
                  </div>

                  {/* What You'll Learn */}
                  <div className="bg-gradient-to-br from-[#1D6E61]/5 to-[#EAB141]/5 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">
                      What You'll Learn
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Master the fundamental concepts",
                        "Build real-world projects",
                        "Gain practical experience",
                        "Get industry-ready skills",
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-[#1D6E61] flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "curriculum" && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-[#1D6E61]" />
                    Course Curriculum
                  </h2>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((week) => (
                      <div
                        key={week}
                        className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#1D6E61] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#1D6E61]/10 rounded-full flex items-center justify-center">
                              <span className="text-[#1D6E61] font-bold">
                                {week}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">
                                Week {week}
                              </h4>
                              <p className="text-gray-600 text-sm">
                                Introduction to concepts
                              </p>
                            </div>
                          </div>
                          <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "requirements" && (
                <div>
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-[#1D6E61]" />
                    Requirements
                  </h2>
                  <div className="space-y-4">
                    {[
                      "Basic understanding of the subject",
                      "Access to a computer or laptop",
                      "Internet connection for online resources",
                      "Willingness to learn and practice",
                    ].map((req, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-6 h-6 bg-[#1D6E61] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <span className="text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses Section */}
      {relatedCourses.length > 0 && (
        <RelatedCourses
          relatedCourses={relatedCourses}
          onCourseClick={(courseId) => navigate(`/course/${courseId}`)}
        />
      )}
    </div>
  );
};

export default CourseDetailPage;
