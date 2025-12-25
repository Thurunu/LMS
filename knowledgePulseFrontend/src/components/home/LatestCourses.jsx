import CourseCard from "../../components/course/CourseCard";

const LatestCourses = ({
  courses = [],
  placeholders = [],
  loading = false,
}) => {
  const list = courses.length > 0 ? courses : placeholders;

  return (
    <section className="py-16 px-6 bg-[#F1F1F1]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Latest Courses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {list.map((course, idx) => (
            <CourseCard
              key={course.id || `ph-${idx}`}
              course={course}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCourses;
