import { courseImages } from '../../services/assets';


const RelatedCourses = ({ relatedCourses, onCourseClick }) => {
  if (!relatedCourses || relatedCourses.length === 0) return null;

  return (
    <section className="py-16 px-6 bg-[#F1F1F1]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Other Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {relatedCourses.map((relatedCourse, idx) => (
            <div
              key={relatedCourse.id || relatedCourse._id}
              onClick={() => onCourseClick(relatedCourse.id || relatedCourse._id)}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative overflow-hidden h-32">
                <img
                  src={
                    relatedCourse.image ||
                    (courseImages && courseImages.length > 0 ? courseImages[idx % courseImages.length] : null) ||
                    `https://via.placeholder.com/400x250/1D6E61/FFFFFF?text=${encodeURIComponent(relatedCourse.courseName || 'Course')}`
                  }
                  alt={relatedCourse.courseName}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-lg">
                  {relatedCourse.courseName}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {relatedCourse.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    👨‍🏫 {relatedCourse.instructor}
                  </span>
                  <span className="text-[#1D6E61] font-bold text-sm">
                    {relatedCourse.credits} Credits
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedCourses;
