import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRoute({ requiredRole }) {
  const { user, loading } = useAuth();
  // const location = useLocation();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
