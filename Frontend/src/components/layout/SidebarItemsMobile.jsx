import { NavLink } from "react-router-dom";

function SidebarItems({ label, icon, path }) {
  const Icon = icon;
  return (
    <NavLink
      to={path}
      className="flex w-full flex-col items-center px-3 pt-2 pb-1 text-[10px] rounded-xl  hover:bg-[#1DB954]/10   my-2"
    >
      <Icon size={28} className="text-[#1DB954]" />{" "}
      <span className="mt-1 text-green-300/70">{label}</span>
    </NavLink>
  );
}

export default SidebarItems;
