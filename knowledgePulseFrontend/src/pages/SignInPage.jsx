import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  LogIn,
  AlertCircle,
  UserPlus,
  BookOpen,
  Award,
  CheckCircle,
} from "lucide-react";
import authService from "../services/authService";

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login(formData);

      // Check user role and redirect accordingly
      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/my-courses");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-6">
      {/* Decorative Icons */}
      <div className="absolute top-8 left-8 text-[#1D6E61]">
        <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <LogIn className="w-10 h-10" />
        </div>
      </div>

      <div className="absolute top-8 right-8 text-[#EAB141]">
        <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center">
          <BookOpen className="w-10 h-10" />
        </div>
      </div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10">
        {/* Left Side - Branding */}
        <div className="bg-gradient-to-br from-[#1D6E61] to-[#2F3F3F] p-12 flex flex-col justify-center text-white relative overflow-hidden hidden md:flex">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#EAB141]/20 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              KnowledgePulse
            </div>

            <h2 className="text-4xl font-bold mb-4">
              Welcome Back to Your Learning Journey
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Continue your educational adventure and unlock your potential with
              expert-led courses.
            </p>

            {/* Features List */}
            <div className="space-y-4">
              {[
                { icon: CheckCircle, text: "Access to 500+ courses" },
                { icon: Award, text: "Learn from expert instructors" },
                { icon: BookOpen, text: "Track your progress" },
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-white/90">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#1D6E61]/10 text-[#1D6E61] px-4 py-2 rounded-full text-sm font-medium mb-4">
              <LogIn className="w-4 h-4" />
              Sign In
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="text-[#1D6E61]">Welcome</span>{" "}
              <span className="text-[#EAB141]">Back</span>
            </h1>
            <p className="text-gray-600">Sign in to continue your learning</p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1D6E61] transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#1D6E61] hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#1D6E61] transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-5 w-5 text-[#1D6E61] focus:ring-[#1D6E61] border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-3 block text-sm text-gray-700"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#1D6E61] font-semibold hover:underline inline-flex items-center gap-1"
              >
                Register here
                <span>→</span>
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Lock className="w-4 h-4" />
              <span>Your data is secure and encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
