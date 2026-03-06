function AlbumItem({ title, albumArt }) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative items-stretch aspect-square overflow-hidden rounded-2xl cursor-pointer">
        <img
          src={albumArt || "track-icon.png"}
          alt=""
          className="w-full h-full object-cover hover:scale-105 transition ease-in duration-300"
        />
      </div>
      <h1 className="p-1 text-sm font-semibold truncate text-center">
        {title}
      </h1>
    </div>
  );
}

export default AlbumItem;
