const CourseDescription = ({ description }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Description</h2>
      <p className="text-gray-700 leading-relaxed mb-4">{description}</p>
    </div>
  );
};

export default CourseDescription;
