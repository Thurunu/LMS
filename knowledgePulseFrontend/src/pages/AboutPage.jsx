import {
  ArrowRight,
  Award,
  BookOpen,
  Lightbulb,
  Quote,
  Search,
  Star,
  Target,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import EasySteps from "../components/EasySteps";
import Instructors from "../components/Instructors";

const AboutPage = () => {
  const mentors = [
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

  const howItWorks = [
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

  const stats = [
    { icon: Users, value: "10,000+", label: "Active Students" },
    { icon: BookOpen, value: "500+", label: "Expert Courses" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: TrendingUp, value: "4.8/5", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Decorative Icons */}
        <div className="absolute top-8 left-8 text-[#1D6E61]">
          <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <Target className="w-10 h-10" />
          </div>
        </div>

        <div className="absolute top-8 right-8 text-[#EAB141]">
          <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <Lightbulb className="w-10 h-10" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#1D6E61]/10 text-[#1D6E61] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Target className="w-4 h-4" />
            Our Vision
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            <span className="text-[#1D6E61]">Empowering</span>{" "}
            <span className="text-[#EAB141]">Education</span>{" "}
            <span className="text-gray-900">for a Better Tomorrow</span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl italic max-w-3xl mx-auto mb-8 leading-relaxed">
            We aspire to create a global landscape where individuals everywhere
            possess the ability to reshape their destinies through the
            empowerment of education.
          </p>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How KnowledgePulse Works */}
      <EasySteps />
      {/* Professional Mentors */}
      <Instructors />

      {/* Testimonial */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Decorative Section */}
              <div className="bg-gradient-to-br from-[#1D6E61] to-[#2F3F3F] p-12 flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#EAB141]/20 rounded-full translate-x-1/3 translate-y-1/3"></div>

                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 rounded-full mb-6">
                    <Quote className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    What Our
                  </h3>
                  <h3 className="text-3xl font-bold text-[#EAB141] mb-6">
                    Students Say
                  </h3>
                  <div className="flex justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Testimonial Content */}
              <div className="p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <Quote className="w-12 h-12 text-[#EAB141]/20" />
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-8 italic">
                  "Since implementing KnowledgePulse, our organization has
                  witnessed a remarkable transformation in how we approach
                  learning. The platform's simplicity belies its powerful
                  capabilities, offering a seamless and enjoyable educational
                  experience. The efficiency with which we can now manage
                  courses, track progress, and foster collaboration among
                  learners is truly impressive."
                </p>

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    TW
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900">
                      Theresa Webb
                    </p>
                    <p className="text-gray-600">
                      Learning & Development Manager
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all ${
                        index === 0 ? "w-8 bg-[#1D6E61]" : "w-2 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#1D6E61]">Our</span>{" "}
              <span className="text-[#EAB141]">Core Values</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Excellence",
                description:
                  "We strive for the highest quality in everything we deliver to our learners.",
                color: "from-[#1D6E61] to-[#2F3F3F]",
              },
              {
                icon: Users,
                title: "Community",
                description:
                  "We foster a supportive learning environment where everyone can thrive.",
                color: "from-[#EAB141] to-[#d99a2a]",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description:
                  "We continuously improve our platform to enhance the learning experience.",
                color: "from-green-500 to-green-600",
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-[#1D6E61] transition-all hover:shadow-lg"
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] rounded-3xl shadow-2xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#EAB141]/20 rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students already learning on KnowledgePulse
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-white text-[#1D6E61] px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <UserPlus className="w-5 h-5" />
                  Sign Up Now
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 bg-[#EAB141] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  <BookOpen className="w-5 h-5" />
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
