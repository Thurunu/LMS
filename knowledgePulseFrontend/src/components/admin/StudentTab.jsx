import { BookOpen, Trash2, User, Users } from "lucide-react";

const StudentTab = ({ students = [], handleDeleteStudent = () => {} }) => {
  const getEnrolledCount = (s) => {
    if (!s) return 0;
    if (Array.isArray(s.enrolledCourses)) return s.enrolledCourses.length;
    if (Array.isArray(s.courses)) return s.courses.length;
    if (Array.isArray(s.enrolled)) return s.enrolled.length;
    if (typeof s.enrolledCourses === "number") return s.enrolledCourses;
    if (typeof s.enrolledCoursesCount === "number")
      return s.enrolledCoursesCount;
    if (typeof s.enrollmentsCount === "number") return s.enrollmentsCount;
    return 0;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            <span className="text-[#1D6E61]">Students</span>{" "}
            <span className="text-[#EAB141]">Management</span>
          </h2>
          <p className="text-gray-600">{students.length} registered students</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border-2 border-gray-100">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Enrolled Courses
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {students.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No students found</p>
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.id || student._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar: use profilePicture/avatar/photo if available, otherwise show initials */}
                      {student.profilePicture ||
                      student.avatar ||
                      student.photo ||
                      student.profile_image ? (
                        <img
                          src={
                            student.profilePicture ||
                            student.avatar ||
                            student.photo ||
                            student.profile_image
                          }
                          alt={
                            student.name || student.email || "Student avatar"
                          }
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-full flex items-center justify-center text-white">
                          <User className="w-5 h-5" />
                        </div>
                      )}

                      <span className="font-medium">
                        {student.name ||
                          (student.firstName && student.lastName
                            ? `${student.firstName} ${student.lastName}`
                            : "Unknown")}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {student.phone || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 bg-[#1D6E61]/10 text-[#1D6E61] px-3 py-1 rounded-full text-sm font-semibold">
                      <BookOpen className="w-4 h-4" />
                      {getEnrolledCount(student)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleDeleteStudent(student.id || student._id)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTab;
