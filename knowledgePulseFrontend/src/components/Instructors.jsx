import { Star, Users } from "lucide-react";
import { instructorImages } from "../services/assets";

const defaultMentors = [
  {
    name: "Darrell Steward",
    role: "UX/UI Designer",
    rating: 4.8,
    reviews: "44k",
  },
  {
    name: "Kathryn Murphy",
    role: "Data Scientist",
    rating: 4.9,
    reviews: "52k",
  },
  {
    name: "Brooklyn Simmons",
    role: "Data Analysis",
    rating: 4.7,
    reviews: "38k",
  },
  {
    name: "Esther Howard",
    role: "UX/UI Designer",
    rating: 4.8,
    reviews: "41k",
  },
];

const Instructors = ({ mentors = defaultMentors }) => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#1D6E61]">Meet Our</span>{" "}
            <span className="text-[#EAB141]">Expert Instructors</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Learn from industry professionals with years of experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border-2 border-gray-100"
            >
              <div className="relative h-64 bg-gradient-to-br from-[#1D6E61]/10 to-[#EAB141]/10 flex items-center justify-center">
                {instructorImages && instructorImages[index] ? (
                  <img
                    src={instructorImages[index]}
                    alt={mentor.name}
                    className="w-32 h-32 rounded-full object-cover shadow-lg"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-full flex items-center justify-center text-white text-5xl font-bold">
                    {mentor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-bold">{mentor.rating}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl mb-1 text-gray-900">
                  {mentor.name}
                </h3>
                <p className="text-[#1D6E61] font-semibold text-sm mb-3">
                  {mentor.role}
                </p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Experienced professional dedicated to helping students achieve
                  their learning goals.
                </p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{mentor.reviews} reviews</span>
                  </div>
                  <button className="text-[#1D6E61] font-semibold text-sm hover:underline">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
