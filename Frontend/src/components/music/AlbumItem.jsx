function AlbumItem({ title, albumArt, artist }) {
  return (
    <div>
      <div className="relative items-stretch aspect-square overflow-hidden rounded-2xl cursor-pointer">
        <img
          src={albumArt || "track-icon.png"}
          alt=""
          className="w-full h-full object-cover hover:scale-105 transition ease-in duration-300"
        />
      </div>
      <div className="px-2 py-1">
        <h1 className="text-sm font-semibold truncate line-clamp-1">{title}</h1>
        <p className="text-sm text-zinc-400 truncate line-clamp-1">{artist}</p>
      </div>
    </div>
  );
}

export default AlbumItem;
