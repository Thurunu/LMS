import {
  AlertCircle,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  TrendingUp,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import studentService from "../services/studentService";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    highestEducation: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await studentService.getMyProfile();
      setProfile({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
        highestEducation: data.highestEducation || "",
      });
    } catch (error) {
      setMessage({ type: "error", text: "Error loading profile" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      await studentService.updateMyProfile(profile);
      setMessage({ type: "success", text: "Profile updated successfully!" });

      // Update user in localStorage
      const currentUser = authService.getCurrentUser();
      localStorage.setItem(
        "user",
        JSON.stringify({ ...currentUser, ...profile })
      );

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Error updating profile",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1D6E61] mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="py-12 px-6 relative overflow-hidden">
        {/* Decorative Icons */}
        <div className="absolute top-8 left-8 text-[#1D6E61]">
          <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <User className="w-10 h-10" />
          </div>
        </div>

        <div className="absolute top-8 right-8 text-[#EAB141]">
          <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
            <Award className="w-10 h-10" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#1D6E61]/10 text-[#1D6E61] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <User className="w-4 h-4" />
            Student Profile
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#1D6E61]">My</span>{" "}
            <span className="text-[#EAB141]">Profile</span>
          </h1>

          <p className="text-gray-600 text-lg italic">
            Manage your personal information and preferences
          </p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Profile Header Card */}
            <div className="bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] p-8 text-white">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm">
                  {(profile.firstName?.[0] || "S").toUpperCase()}
                  {(profile.lastName?.[0] || "").toUpperCase()}
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold mb-1">
                    {profile.firstName} {profile.lastName}
                  </h2>
                  <p className="text-white/80 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="p-8 md:p-12">
              {/* Success/Error Message */}
              {message.text && (
                <div
                  className={`mb-6 rounded-xl p-4 flex items-start gap-3 border-2 ${
                    message.type === "success"
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={`font-medium ${
                      message.type === "success"
                        ? "text-green-800"
                        : "text-red-800"
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information Section */}
                <div>
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-[#1D6E61]" />
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="firstName"
                          value={profile.firstName}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1D6E61] transition-colors"
                          placeholder="Enter first name"
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="lastName"
                          value={profile.lastName}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1D6E61] transition-colors"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>

                    {/* Email (Disabled) */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleChange}
                          required
                          disabled
                          className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 cursor-not-allowed text-gray-500"
                        />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Email cannot be changed
                      </p>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={profile.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1D6E61] transition-colors"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    {/* Highest Education */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Highest Education Level
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <BookOpen className="w-5 h-5 text-gray-400" />
                        </div>
                        <select
                          name="highestEducation"
                          value={profile.highestEducation}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1D6E61] transition-colors appearance-none bg-white"
                        >
                          <option value="">Select education level</option>
                          <option value="High School">High School</option>
                          <option value="Associate Degree">
                            Associate Degree
                          </option>
                          <option value="Bachelor's Degree">
                            Bachelor's Degree
                          </option>
                          <option value="Master's Degree">
                            Master's Degree
                          </option>
                          <option value="Doctorate">Doctorate</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-4 pointer-events-none">
                          <MapPin className="w-5 h-5 text-gray-400" />
                        </div>
                        <textarea
                          name="address"
                          value={profile.address}
                          onChange={handleChange}
                          rows="3"
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1D6E61] transition-colors resize-none"
                          placeholder="Enter your full address"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save Changes
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/my-courses")}
                    className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Quick Stats Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#1D6E61]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    Member Since
                  </p>
                  <p className="text-2xl font-bold text-[#1D6E61]">2024</p>
                </div>
                <div className="w-12 h-12 bg-[#1D6E61]/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#1D6E61]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#EAB141]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    Courses Enrolled
                  </p>
                  <p className="text-2xl font-bold text-[#EAB141]">--</p>
                </div>
                <div className="w-12 h-12 bg-[#EAB141]/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#EAB141]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium mb-1">
                    Progress
                  </p>
                  <p className="text-2xl font-bold text-green-600">Active</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentProfile;
