import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Spinner from "./UI/Spinner";

function ProtectedRoute({ requiredRole }) {
  const { user, loading } = useAuth();
  // const location = useLocation();

  if (loading) return <Spinner />;

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
