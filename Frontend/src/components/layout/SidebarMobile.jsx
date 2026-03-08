import { House, Library, User, Box, LogOutIcon } from "lucide-react";
import SidebarItemsMobile from "./SidebarItemsMobile";
import { useAuth } from "../../context/authContext";

function SidebarMobile() {
  const { user } = useAuth();

  return (
    <div className="md:hidden flex flex-col fixed -mb-0.5 pb-0.5 bottom-0 w-full h-20 bg-[#020a05] bg-gradient-to-b from-[#1DB954]/5 to-transparent shrink-0 border-t border-[#1DB954]/10">
      <div className="h-full flex justify-around px-3">
        <SidebarItemsMobile label={"Home"} icon={House} path={"/"} />
        <SidebarItemsMobile label={"Albums"} icon={Library} path={"/albums"} />
        {user.role === "artist" && (
          <SidebarItemsMobile
            label={"Studio"}
            icon={Box}
            path={"/artist-studio"}
          />
        )}
        <SidebarItemsMobile label={"Profile"} icon={User} path={"/profile"} />
      </div>
    </div>
  );
}

export default SidebarMobile;
