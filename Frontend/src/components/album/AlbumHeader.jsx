import { Edit, MoreHorizontal, Play, Trash } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import DropDown from "../UI/DropDown";

function AlbumHeader({ album, albumId, onDelete }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useAuth();

  const isOwner = user && album?.artist?._id === user._id;

  const dropdownItems = [
    {
      label: "Delete album",
      icon: Trash,
      onClick: () => {
        onDelete(albumId);
        setIsDropdownOpen(false);
      },
    },
  ];

  return (
    <div className="flex max-md:flex-col gap-5 items-end max-md:items-start">
      <div className="rounded-lg w-full overflow-hidden sm:w-80 md:w-70 shrink-0">
        <img
          src={album?.albumArt || "/track-icon.png"}
          alt={album?.title}
          className="object-cover w-full h-full aspect-square"
        />
      </div>
      <div className="flex flex-col gap-4 max-md:gap-0 items-start">
        <h1 className="text-7xl max-md:text-2xl font-bold">
          {album?.title || "Album"}
        </h1>
        <div className="flex gap-2 text-lg max-md:text-sm text-zinc-200/60">
          <p>{album?.artist?.username || "Artist"}</p>•
          <p>{`${album?.musics?.length || 0} ${album?.musics?.length > 1 ? "Tracks" : "Track"}`}</p>
        </div>
        <div className="flex gap-3 items-end ">
          <button className="w-30 max-md:w-40 max-md:mt-6 flex items-center justify-center gap-2 shadow-lg shadow-green-300/25 bg-green-500 px-2 py-3 mt-2 rounded-full cursor-pointer hover:-translate-y-1 transition-all ease-in duration-100 active:scale-95">
            <Play fill="white" />
            Play
          </button>
          {isOwner && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default AlbumHeader;
