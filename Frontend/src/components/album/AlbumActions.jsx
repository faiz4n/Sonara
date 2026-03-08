import { Edit, MoreHorizontal, Play, Trash } from "lucide-react";
import { useState } from "react";
import DropDown from "../UI/DropDown";

function AlbumActions({ albumId, onDelete }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownItems = [
    {
      label: "Delete album",
      icon: Trash,
      onClick: () => {
        onDelete(albumId);
        setIsDropdownOpen(false);
      },
    },
    {
      label: "Edit Album",
      icon: Edit,
      onClick: () => {
        setIsDropdownOpen(false);
      },
    },
  ];

  return (
    <div className="flex gap-3 items-end">
      <button className="w-30 max-md:w-40 max-md:mt-6 flex items-center justify-center gap-2 shadow-lg shadow-green-300/25 bg-green-500 px-2 py-3 mt-2 rounded-full cursor-pointer hover:-translate-y-1 transition-all ease-in duration-100 active:scale-95">
        <Play fill="white" />
        Play
      </button>
      <div className="relative">
        <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
          <div className="p-2 rounded-full flex items-center justify-center w-10 h-10 hover:bg-green-900">
            <MoreHorizontal size={20} />
          </div>
        </button>
        {isDropdownOpen && (
          <DropDown
            className="absolute w-35 max-md:bottom-12 bg-green-950/80 px-2 py-3 rounded-md backdrop-blur-2xl shadow-lg"
            dropDownList={dropdownItems}
          />
        )}
      </div>
    </div>
  );
}

export default AlbumActions;
