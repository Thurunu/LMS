import {
  Award,
  BookOpen,
  Clock,
  Grid,
  List,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { courseImages, instructorImages } from "../services/assets";
import courseService from "../services/courseService";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const data = await courseService.getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Helper function to get course image
  const getCourseImage = (index) => {
    if (courseImages && courseImages.length > 0) {
      return courseImages[index % courseImages.length];
    }
    return `https://via.placeholder.com/400x250/1D6E61/FFFFFF?text=Course`;
  };

  // Helper function to get instructor image
  const getInstructorImage = (index) => {
    if (instructorImages && instructorImages.length > 0) {
      return instructorImages[index % instructorImages.length];
    }
    return null;
  };

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
            Explore Our Courses
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-[#1D6E61]">Discover Your</span>
            <br />
            <span className="text-[#EAB141]">Perfect Course</span>
          </h1>

          <p className="text-gray-600 text-lg italic max-w-2xl mx-auto mb-8">
            The platform's simplicity belies its powerful capabilities, offering
            a seamless and enjoyable educational experience.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative bg-white rounded-full shadow-lg p-2">
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 pr-32 rounded-full text-gray-800 focus:outline-none"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white px-8 rounded-full hover:shadow-lg transition-all inline-flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Course List */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter Section */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-4">
                <div className="flex bg-gray-100 rounded-full p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-full transition-all ${
                      viewMode === "grid"
                        ? "bg-white text-[#1D6E61] shadow-md"
                        : "text-gray-600"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-full transition-all ${
                      viewMode === "list"
                        ? "bg-white text-[#1D6E61] shadow-md"
                        : "text-gray-600"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Course Grid/List */}
            {loading ? (
              <div className="text-center py-16">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1D6E61] mx-auto"></div>
                <p className="mt-4 text-gray-600 font-medium">
                  Loading courses...
                </p>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No Courses Found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course, index) => (
                  <Link
                    to={`/course/${course.id || course._id}`}
                    key={course.id || course._id}
                    className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-[#1D6E61] hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Course Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={course.image || getCourseImage(index)}
                        alt={course.courseName || course.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {/* Category Badge */}
                      {course.category && (
                        <div className="absolute top-3 right-3 bg-[#1D6E61] text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {course.category}
                        </div>
                      )}
                    </div>

                    {/* Course Content */}
                    <div className="p-5">
                      {/* Instructor */}
                      <div className="flex items-center gap-2 mb-3">
                        {getInstructorImage(index) ? (
                          <img
                            src={getInstructorImage(index)}
                            alt={course.instructor}
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
                      <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2 min-h-[3.5rem] group-hover:text-[#1D6E61] transition-colors">
                        {course.courseName || course.title}
                      </h3>

                      {/* Course Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {course.description || "No description available"}
                      </p>

                      {/* Course Stats */}
                      <div className="flex items-center justify-between mb-4 text-sm">
                        <div className="flex items-center gap-1 text-[#EAB141]">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-semibold">
                            {course.rating || "4.5"}
                          </span>
                          <span className="text-gray-500">
                            ({course.reviews || 0})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{course.enrolledStudents || 0}</span>
                        </div>
                      </div>

                      {/* Price and Credits */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-[#1D6E61] font-bold text-lg">
                          {course.credits} Credits
                        </span>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration || "12 weeks"}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {filteredCourses.map((course, index) => (
                  <Link
                    to={`/course/${course.id || course._id}`}
                    key={course.id || course._id}
                    className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-[#1D6E61] hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Course Image */}
                      <div className="relative overflow-hidden md:w-80 flex-shrink-0">
                        <img
                          src={course.image || getCourseImage(index)}
                          alt={course.courseName || course.title}
                          className="w-full h-48 md:h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {course.category && (
                          <div className="absolute top-3 right-3 bg-[#1D6E61] text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {course.category}
                          </div>
                        )}
                      </div>

                      {/* Course Content */}
                      <div className="p-6 flex-1">
                        <div className="flex flex-col h-full">
                          {/* Instructor */}
                          <div className="flex items-center gap-2 mb-3">
                            {getInstructorImage(index) ? (
                              <img
                                src={getInstructorImage(index)}
                                alt={course.instructor}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-full flex items-center justify-center text-white font-bold">
                                {(course.instructor || "I")[0].toUpperCase()}
                              </div>
                            )}
                            <span className="text-gray-600 font-medium">
                              {course.instructor || "Instructor"}
                            </span>
                          </div>

                          {/* Course Title */}
                          <h3 className="font-bold text-2xl mb-3 text-gray-800 group-hover:text-[#1D6E61] transition-colors">
                            {course.courseName || course.title}
                          </h3>

                          {/* Course Description */}
                          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                            {course.description || "No description available"}
                          </p>

                          {/* Course Stats */}
                          <div className="flex items-center gap-6 text-sm">
                            <div className="flex items-center gap-1 text-[#EAB141]">
                              <Star className="w-5 h-5 fill-current" />
                              <span className="font-semibold">
                                {course.rating || "4.5"}
                              </span>
                              <span className="text-gray-500">
                                ({course.reviews || 0} reviews)
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Users className="w-5 h-5" />
                              <span>
                                {course.enrolledStudents || 0} students
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Clock className="w-5 h-5" />
                              <span>{course.duration || "12 weeks"}</span>
                            </div>
                            <div className="ml-auto">
                              <span className="text-[#1D6E61] font-bold text-xl">
                                {course.credits} Credits
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Stats Section */}
          {!loading && filteredCourses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#1D6E61] to-[#2F3F3F] text-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-1">
                      Total Courses
                    </p>
                    <p className="text-4xl font-bold">{courses.length}</p>
                  </div>
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <BookOpen className="w-8 h-8" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#EAB141] to-[#d99a2a] text-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-1">
                      Expert Instructors
                    </p>
                    <p className="text-4xl font-bold">
                      {new Set(courses.map((c) => c.instructor)).size}
                    </p>
                  </div>
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8" />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CoursePage;
