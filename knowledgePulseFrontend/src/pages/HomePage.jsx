import { useEffect, useState } from "react";
import EasySteps from "../components/EasySteps";
import HeroSection from "../components/HeroSection";
import LatestCourses from "../components/home/LatestCourses";
import Instructors from "../components/Instructors";
import courseService from "../services/courseService";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const placeholders = Array.from({ length: 8 }).map((_, i) => ({
    id: `ph-${i}`,
    courseName: "",
    description: "",
    instructor: "",
    thumbnail: null,
    instructorPhoto: null,
    rating: null,
    reviewsCount: null,
    credits: null,
  }));

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const data = await courseService.getAllCourses();
        if (!mounted) return;
        setCourses(Array.isArray(data) ? data.slice(0, 8) : []);
      } catch (err) {
        console.error("Failed to load courses for homepage:", err);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      <LatestCourses courses={courses} placeholders={placeholders} />

      <EasySteps />

      <Instructors />
    </div>
  );
};

export default HomePage;
