import { Navigate } from "react-router-dom";
import authService from "../services/authService";

// Protected Route Component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const isAuthenticated = authService.isAuthenticated();
  const isAdmin = authService.isAdmin();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/signin" replace />;
  }

  if (adminOnly && !isAdmin) {
    // Redirect to home if not admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
