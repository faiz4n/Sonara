import { NavLink } from "react-router-dom";

function SidebarItems({ label, icon, path }) {
  const Icon = icon;
  return (
    <NavLink
      to={path}
      className="flex items-center gap-2 p-3 text-[14px] rounded-md font-semibold hover:bg-[#1DB954]/10   my-2"
    >
      <Icon size={28} className="text-[#1DB954]" /> <span>{label}</span>
    </NavLink>
  );
}

export default SidebarItems;
