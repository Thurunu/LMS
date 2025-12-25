const CourseInfo = ({ course, isEnrolled }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Information</h2>
      <div className="bg-gray-50 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <span className="font-semibold text-gray-700">Course Code:</span>
          <span className="text-gray-900">{course.courseCode}</span>
        </div>
        <div className="flex items-center justify-between border-b pb-3">
          <span className="font-semibold text-gray-700">Credits:</span>
          <span className="text-gray-900">{course.credits}</span>
        </div>
        <div className="flex items-center justify-between border-b pb-3">
          <span className="font-semibold text-gray-700">Instructor:</span>
          <span className="text-gray-900">{course.instructor}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-gray-700">Status:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              isEnrolled
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {isEnrolled ? "Enrolled" : "Available"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
