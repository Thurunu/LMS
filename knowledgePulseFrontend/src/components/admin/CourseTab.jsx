import React from "react";

const CourseTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-[#1D6E61]">Courses</span>{" "}
            <span className="text-[#EAB141]">Management</span>
          </h2>
          <p className="text-gray-600">{courses.length} available courses</p>
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
                  setNewCourse({ ...newCourse, courseCode: e.target.value })
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
                  setNewCourse({ ...newCourse, courseName: e.target.value })
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
                  setNewCourse({ ...newCourse, instructor: e.target.value })
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
                  setNewCourse({ ...newCourse, credits: e.target.value })
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
                  setNewCourse({ ...newCourse, description: e.target.value })
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
                <span className="text-sm font-medium">{course.instructor}</span>
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
                  onClick={() => handleDeleteCourse(course.id || course._id)}
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
  );
};

export default CourseTab;
