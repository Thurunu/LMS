import { useNavigate } from "react-router-dom";
import { courseImages, instructorImages } from "../../services/assets";

const CourseCard = ({ course, index = 0 }) => {
  const navigate = useNavigate();

  const thumb =
    course.thumbnail ||
    (courseImages && courseImages.length
      ? courseImages[index % courseImages.length]
      : `https://via.placeholder.com/300x200`);
  const instructorPhoto =
    course.instructorPhoto ||
    (instructorImages && instructorImages.length
      ? instructorImages[index % instructorImages.length]
      : null);

  return (
    <div
      onClick={() => navigate(`/course/${course.id}`)}
      className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg 
      transition-shadow cursor-pointer"
    >
      <img
        src={thumb}
        alt={course.courseName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {instructorPhoto ? (
            <img
              src={instructorPhoto}
              alt={course.instructor || "Instructor"}
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          )}
          <span className="text-sm text-gray-600">
            {course.instructor || "Instructor"}
          </span>
        </div>
        <h3 className="font-semibold mb-2">{course.courseName}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-semibold">
              {course.rating || "4.8"}
            </span>
            <span className="text-sm text-gray-500">
              ({course.reviewsCount || "44k"} reviews)
            </span>
          </div>
          <div className="text-[#1D6E61] font-bold text-sm">
            {course.credits || 3} Credits
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
