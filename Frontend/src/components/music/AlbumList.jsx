import AlbumItem from "./AlbumItem";

function AlbumList({ albums }) {
  return (
    <div>
      <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-4 lg:place-items-center md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-3.5 ">
        {albums.map((album) => (
          <AlbumItem
            title={album.title}
            key={album._id}
            albumArt={album.albumArt}
          />
        ))}
      </div>
    </div>
  );
}

export default AlbumList;
