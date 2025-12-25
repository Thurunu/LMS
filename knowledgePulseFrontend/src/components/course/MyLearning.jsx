import React from "react";

const MyLearning = () => {
  return (
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
                            {course.lessons || course.credits || "N/A"} lessons
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
  );
};

export default MyLearning;
