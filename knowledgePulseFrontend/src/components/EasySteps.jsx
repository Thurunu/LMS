import { ArrowRight, Search, UserPlus, Users } from "lucide-react";
import { Link } from "react-router-dom";

const defaultHowItWorks = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Sign up and set up your personalized learning profile to track your progress and achievements.",
    color: "text-[#1D6E61]",
    bgColor: "bg-[#1D6E61]/10",
  },
  {
    icon: Search,
    title: "Search Courses",
    description:
      "Browse through our extensive catalog of courses and find the perfect match for your learning goals.",
    color: "text-[#EAB141]",
    bgColor: "bg-[#EAB141]/10",
  },
  {
    icon: Users,
    title: "Start Learning",
    description:
      "Connect with expert instructors and fellow learners to build your knowledge and skills.",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
];

const EasySteps = ({
  howItWorks = defaultHowItWorks,
  title = "How",
  brand = "KnowledgePulse",
  subtitle = "Get started with your learning journey in three simple steps",
}) => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#1D6E61]">{title}</span>{" "}
            <span className="text-[#EAB141]">{brand}</span>{" "}
            <span className="text-gray-900">Works</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto`}
                  >
                    <Icon className={`w-10 h-10 ${step.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {step.description}
                </p>

                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 text-[#1D6E61] font-semibold hover:gap-3 transition-all"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EasySteps;
