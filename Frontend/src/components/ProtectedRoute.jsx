import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRoute({ requiredRole }) {
  const { user, loading } = useAuth();
  // const location = useLocation();

  if (loading)
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <div className="w-10 h-10 border-5 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
