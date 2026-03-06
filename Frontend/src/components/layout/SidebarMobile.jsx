import { House, Disc, User, Box, LogOutIcon } from "lucide-react";
import SidebarItemsMobile from "./SidebarItemsMobile";
import { logoutUser } from "../../services/auth.service";
import { useAuth } from "../../context/authContext";

function SidebarMobile() {
  const { user, setUser } = useAuth();
  console.log(user);

  async function handleLogout() {
    await logoutUser();
    setUser(null);
  }

  return (
    <div className="md:hidden flex flex-col fixed -mb-0.5 pb-0.5 bottom-0 w-full h-20 bg-[#0b1710] shrink-0 border-t-2 border-t-zinc-700/20">
      <div className="h-full flex justify-around px-3">
        <SidebarItemsMobile label={"Home"} icon={House} path={"/"} />
        <SidebarItemsMobile label={"Albums"} icon={Disc} path={"/albums"} />
        {user.role === "artist" && (
          <SidebarItemsMobile
            label={"Studio"}
            icon={Box}
            path={"/artist-studio"}
          />
        )}
        <SidebarItemsMobile label={"Profile"} icon={User} path={"/profile"} />
        {/* <button
          onClick={handleLogout}
          className="flex flex-col w-full justify-center items-center pt-2 text-[14px] rounded-md font-semibold hover:bg-[#1DB954]/10 my-2  cursor-pointer"
        >
          <LogOutIcon size={28} className="text-[#1DB954] shrink-0" />
          <span className="mt-1 text-green-300/70 text-[10px] pb-1">
            Logout
          </span>
        </button> */}
      </div>
    </div>
  );
}

export default SidebarMobile;
