import authService from "../../services/authService";

const EnrollmentPanel = ({
  credits,
  isEnrolled,
  enrolling,
  onEnroll,
  onUnenroll,
}) => {
  return (
    <div className="bg-white border rounded-lg p-6 sticky top-6 shadow-lg">
      <h3 className="text-2xl font-bold text-[#1D6E61] mb-4">
        {credits} Credits Course
      </h3>

      {isEnrolled ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <p className="text-green-800 font-semibold flex items-center gap-2">
              <span>✓</span> You are enrolled in this course
            </p>
          </div>
          <button
            onClick={onUnenroll}
            disabled={enrolling}
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enrolling ? "Processing..." : "Unenroll from Course"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <button
            onClick={onEnroll}
            disabled={enrolling}
            className="w-full bg-[#1D6E61] text-white py-3 rounded-md hover:bg-[#2F3F3F] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {enrolling ? "Enrolling..." : "Enroll Now"}
          </button>
          <p className="text-sm text-gray-600 text-center">
            {authService.isAuthenticated()
              ? "Click to enroll in this course"
              : "Please login to enroll"}
          </p>
        </div>
      )}

      <div className="mt-6 pt-6 border-t space-y-4">
        <h4 className="font-bold">Course Highlights</h4>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-sm text-gray-700">
              Learn from expert instructor
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-sm text-gray-700">
              Comprehensive course material
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-sm text-gray-700">
              Earn {credits} academic credits
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span className="text-sm text-gray-700">
              Flexible learning schedule
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EnrollmentPanel;
