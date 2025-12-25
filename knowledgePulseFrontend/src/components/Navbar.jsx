import {
  BookMarked,
  BookOpen,
  Contact,
  Home,
  LogOut,
  Menu,
  User,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = authService.isAuthenticated();
  const isAdmin = authService.isAdmin();
  const currentUser = authService.getCurrentUser();

  // Base nav items
  const baseNavItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Courses", icon: BookOpen, href: "/courses" },
    { name: "About", icon: BookMarked, href: "/about" },
    { name: "FAQ", icon: Contact, href: "/faq" },
  ];

  // Add role-specific navigation items
  const navItems = isAuthenticated
    ? [
        ...baseNavItems,
        ...(isAdmin
          ? [{ name: "Dashboard", icon: Users, href: "/admin/dashboard" }]
          : [{ name: "My Courses", icon: BookMarked, href: "/my-courses" }]),
      ]
    : baseNavItems;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location]);

  const handleLogout = () => {
    authService.logout();
    setShowUserMenu(false);
  };

  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-3"
            : "bg-white/95 backdrop-blur-sm py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold">
                  <span className="text-[#1D6E61]">Knowledge</span>
                  <span className="text-[#EAB141]">Pulse</span>
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                      active
                        ? "bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Side: User Menu / Sign In */}
            <div className="flex items-center gap-3">
              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu((prev) => !prev)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
                      showUserMenu
                        ? "bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#1D6E61] to-[#EAB141] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {(currentUser?.email?.[0] || "U").toUpperCase()}
                    </div>
                    <span className="hidden sm:block font-medium">
                      {currentUser?.email?.split("@")[0] || "User"}
                    </span>
                  </button>

                  {/* User Dropdown */}
                  {showUserMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 bg-white shadow-2xl rounded-2xl overflow-hidden z-50 border border-gray-100">
                        {/* User Info Header */}
                        <div className="bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] px-4 py-4 text-white">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                              {(currentUser?.email?.[0] || "U").toUpperCase()}
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="font-semibold truncate">
                                {currentUser?.email?.split("@")[0] || "User"}
                              </p>
                              <p className="text-xs text-white/80 truncate">
                                {currentUser?.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
                          {!isAdmin && (
                            <Link
                              to="/profile"
                              onClick={() => setShowUserMenu(false)}
                              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                              <div className="w-8 h-8 bg-[#1D6E61]/10 rounded-lg flex items-center justify-center">
                                <User size={18} className="text-[#1D6E61]" />
                              </div>
                              <span className="font-medium">Edit Profile</span>
                            </Link>
                          )}
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <LogOut size={18} className="text-red-600" />
                            </div>
                            <span className="font-medium">Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                >
                  Sign In
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu((prev) => !prev)}
                className="lg:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowMobileMenu(false)}
          />

          {/* Mobile Menu Panel */}
          <div className="fixed top-[72px] right-0 bottom-0 w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Navigation
              </h3>
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                        active
                          ? "bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] text-white shadow-lg"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* User Section in Mobile Menu */}
              {isAuthenticated && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Account
                  </h3>
                  <div className="bg-gradient-to-r from-[#1D6E61] to-[#2F3F3F] rounded-2xl p-4 mb-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                        {(currentUser?.email?.[0] || "U").toUpperCase()}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-semibold truncate">
                          {currentUser?.email?.split("@")[0] || "User"}
                        </p>
                        <p className="text-xs text-white/80 truncate">
                          {currentUser?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {!isAdmin && (
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                      >
                        <div className="w-8 h-8 bg-[#1D6E61]/10 rounded-lg flex items-center justify-center">
                          <User size={18} className="text-[#1D6E61]" />
                        </div>
                        <span className="font-medium">Edit Profile</span>
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <LogOut size={18} className="text-red-600" />
                      </div>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
