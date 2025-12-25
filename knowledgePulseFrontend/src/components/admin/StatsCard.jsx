import React from "react";

const StatsCard = () => {
  return (
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
              <p className="text-sm text-gray-500 mt-1">Available courses</p>
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
              <p className="text-sm text-gray-500 mt-1">Active enrollments</p>
            </div>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
