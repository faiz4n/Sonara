import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) return <Navigate to="/" />;

  return <Outlet />;
}

export default GuestRoute;
