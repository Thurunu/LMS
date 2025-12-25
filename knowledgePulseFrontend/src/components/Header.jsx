import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="bg-[#CCD0DB] py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-[#1D6E61] text-xl font-semibold whitespace-nowrap"
        >
          KnowledgePulse
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses"
              className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1D6E61]"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
