import React from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, BookOpen, Award, User } from "lucide-react";

const CourseList = (course) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#1D6E61] text-white py-20 px-6 relative overflow-hidden min-h-[400px]">
      {/* Decorative elements */}
      <span className="absolute top-0 right-0 w-24 h-24 bg-[#CCD0DB] rounded-bl-full opacity-80"></span>
      <span className="absolute bottom-0 right-0 w-40 h-40 bg-[#EAB141] rounded-tl-full opacity-70"></span>
      <span className="absolute top-1/2 left-0 w-16 h-16 bg-[#EAB141] rounded-r-full opacity-50"></span>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back button */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/courses")}
            className="text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 flex items-center gap-2 font-medium group px-4 py-2 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Courses
          </button>
        </div>

        {/* Course title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          {course.courseName}
        </h1>

        {/* Course description */}
        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl leading-relaxed">
          {course.description}
        </p>

        {/* Course metadata */}
        <div className="flex flex-wrap items-center gap-8 mb-8">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
            <Award className="w-6 h-6 text-[#EAB141]" />
            <div>
              <p className="text-xs text-white/70 uppercase tracking-wide">
                Credits
              </p>
              <p className="font-semibold text-lg">{course.credits}</p>
            </div>
          </div>

          {course.courseCode && (
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-[#CCD0DB]" />
              <div>
                <p className="text-xs text-white/70 uppercase tracking-wide">
                  Course Code
                </p>
                <p className="font-semibold text-lg">{course.courseCode}</p>
              </div>
            </div>
          )}
        </div>

        {/* Instructor info */}
        <div className="flex items-center gap-3 bg-white/15 backdrop-blur-sm px-5 py-3 rounded-xl inline-flex">
          <div className="w-12 h-12 bg-white text-[#1D6E61] rounded-full flex items-center justify-center font-bold text-xl shadow-md">
            {course.instructor?.charAt(0).toUpperCase() || (
              <User className="w-6 h-6" />
            )}
          </div>
          <div>
            <p className="text-xs text-white/70 uppercase tracking-wide">
              Instructor
            </p>
            <p className="font-semibold text-lg">{course.instructor}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
