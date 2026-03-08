import { NavLink } from "react-router-dom";

function SidebarItems({ label, icon, path }) {
  const Icon = icon;
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex w-full flex-col items-center px-3 pt-2 pb-1 text-[10px] rounded-xl transition-all duration-200 my-2 ${
          isActive
            ? "bg-[#1DB954]/15 text-[#1DB954]"
            : "text-zinc-300 hover:bg-[#1DB954]/10 hover:text-[#1DB954]"
        }`
      }
    >
      <Icon size={28} className="text-[#1DB954]" />
      <span className="mt-1">{label}</span>
    </NavLink>
  );
}

export default SidebarItems;
