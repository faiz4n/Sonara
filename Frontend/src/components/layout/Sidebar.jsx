import { House, Library, User, Box, LogOutIcon } from "lucide-react";
import SidebarItems from "./SidebarItems";
import { useAuth } from "../../context/authContext";

function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col fixed w-80 h-full bg-[#020a05] bg-gradient-to-b from-[#1DB954]/5 to-transparent shrink-0 border-r border-[#1DB954]/10 max-md:hidden">
      <div className="p-5">
        <h1 className="text-[#1DB954] font-bold text-3xl">Sonara</h1>
        <p className="text-[11px] text-zinc-400 font-semibold">
          DEVELOPER PROJECT
        </p>
      </div>
      <div className=" h-full flex flex-col justify-between px-3">
        <div>
          <SidebarItems label="Home" icon={House} path={"/"} />
          <SidebarItems label="Albums" icon={Library} path={"/albums"} />
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
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
