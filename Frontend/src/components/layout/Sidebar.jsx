import { House, Disc, User, Box, LogOutIcon } from "lucide-react";
import SidebarItems from "./SidebarItems";
import { logoutUser } from "../../services/auth.service";
import { useAuth } from "../../context/authContext";

function Sidebar() {
  const { user, setUser } = useAuth();
  console.log(user);

  async function handleLogout() {
    await logoutUser();
    setUser(null);
  }

  return (
    <div className="flex flex-col fixed w-80 bg-[#102617] shrink-0 border-r-2 border-r-zinc-700/20 h-screen">
      <div className="p-5">
        <h1 className="text-[#1DB954] font-bold text-3xl">Sonara</h1>
        <p className="text-[11px] text-zinc-400 font-semibold">
          DEVELOPER PROJECT
        </p>
      </div>
      <div className=" h-full flex flex-col justify-between px-3">
        <div>
          <SidebarItems label="Home" icon={House} path={"/"} />
          <SidebarItems label="Albums" icon={Disc} path={"/albums"} />
          {user.role === "artist" && (
            <SidebarItems
              label="Artist Studio"
              icon={Box}
              path={"/artist-studio"}
            />
          )}
        </div>
        <div>
          <SidebarItems label={user.username} icon={User} path={"/profile"} />
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-3 text-[14px] rounded-md font-semibold hover:bg-[#1DB954]/10 my-2 w-full cursor-pointer"
          >
            <LogOutIcon size={28} className="text-[#1DB954]" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
