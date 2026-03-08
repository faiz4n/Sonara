import { NavLink } from "react-router-dom";

function SidebarItems({ label, icon, path }) {
  const Icon = icon;
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex w-full gap-2 items-center p-3 text-[14px] font-semibold rounded-lg transition-all duration-200 my-2 ${
          isActive
            ? "bg-[#1DB954]/15 text-[#1DB954]"
            : "text-zinc-300 hover:bg-[#1DB954]/10 hover:text-[#1DB954]"
        }`
      }
    >
      <Icon size={28} className="text-[#1DB954]" />
      <span>{label}</span>
    </NavLink>
  );
}

export default SidebarItems;
