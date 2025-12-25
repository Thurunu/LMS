import { Check, Gift, HeadphonesIcon, Shield, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BannerImage from "../assets/BannerImage.jpg";
import FeatureItem from "./home/FeaturedItem";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-6 relative overflow-hidden min-h-screen flex items-center">
      {/* Decorative Icons */}
      <div className="absolute top-8 left-8 text-[#1D6E61]">
        <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
          </svg>
        </div>
      </div>

      <div className="absolute top-8 right-8 text-[#1D6E61]">
        <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 text-[#EAB141]">
        <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 text-[#1D6E61]">
        <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#1D6E61]/10 text-[#1D6E61] px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                New Courses are Available
              </div>

              <h1 className="text-5xl font-bold leading-tight">
                <span className="text-[#EAB141]">Learn Something</span>
                <br />
                <span className="text-[#1D6E61]">New</span>
              </h1>

              <p className="text-gray-600 text-lg italic leading-relaxed">
                Start Learning Today with Knowledge Pulse - Your Gateway to
                Success!
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <FeatureItem icon={Check} text="Easy to Use" variant="teal" />
                  <FeatureItem
                    icon={Shield}
                    text="Fast & Secure"
                    variant="teal"
                  />
                  <FeatureItem
                    icon={HeadphonesIcon}
                    text="24/7 Support"
                    variant="gold"
                  />
                  <FeatureItem icon={Gift} text="Free Updates" variant="gold" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    navigate("/courses");
                  }}
                  className="bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-3xl blur-2xl opacity-20"></div>
                <div className="relative bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-3xl p-1 shadow-2xl">
                  <div className="bg-white rounded-3xl overflow-hidden">
                    <img
                      src={BannerImage}
                      alt="Creative workspace illustration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Decorative elements around image */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#EAB141] rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#1D6E61] rounded-full opacity-70"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
