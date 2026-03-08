import PageHeader from "../components/layout/PageHeader";
import { useAuth } from "../context/authContext";
import { User, Mail, Music, LogOut } from "lucide-react";
import { logoutUser } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import formatDate from "../utils/formatDate";

function Profile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const headers = {
    heading: "Profile",
    caption: "View and manage your profile",
  };

  async function handleLogout() {
    await logoutUser();
    setUser(null);
    navigate("/login", { replace: true });
  }

  return (
    <>
      <PageHeader heading={headers.heading} caption={headers.caption} />

      <div className="m-7">
        {/* Profile Card */}
        <div className="max-w-2xl bg-green-900/20 border border-zinc-100/10 p-8 rounded-lg">
          {/* Avatar & Basic Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
              <User size={48} className="text-white" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white">
                {user?.username}
              </h2>
              <p className="text-zinc-400 text-sm capitalize">{user?.role}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="space-y-4 mb-8">
            {/* Email */}
            <div className="flex items-center gap-3 p-3 bg-green-950/30 rounded-md">
              <Mail size={18} className="text-green-500" />
              <div>
                <p className="text-xs text-zinc-400">Email</p>
                <p className="text-white">{user?.email}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-3 p-3 bg-green-950/30 rounded-md">
              <Music size={18} className="text-green-500" />
              <div>
                <p className="text-xs text-zinc-400">Account Type</p>
                <p className="text-white capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="flex-1 flex items-center justify-center gap-2 bg-red-700/70 hover:bg-red-700/50 text-white font-semibold py-3 rounded-md transition-colors cursor-pointer"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 max-w-2xl">
          <h3 className="text-lg font-bold text-white mb-4">
            Account Information
          </h3>
          <div className="bg-green-900/20 border border-zinc-100/10 p-6 rounded-lg space-y-3">
            <p className="text-sm text-zinc-300">
              <span className="text-zinc-400">Member Since:</span>{" "}
              {formatDate(user.createdAt)}
            </p>
            <p className="text-sm text-zinc-300">
              <span className="text-zinc-400">Status:</span>{" "}
              <span className="text-green-400">Active</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
