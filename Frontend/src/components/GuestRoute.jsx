import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

function GuestRoute() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <div className="w-10 h-10 border-5 border-[#1DB954] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (user) return <Navigate to="/" />;

  return <Outlet />;
}

export default GuestRoute;
