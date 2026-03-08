import { Link } from "react-router-dom";
import AlbumItem from "./AlbumItem";

function AlbumList({ albums }) {
  return (
    <div>
      <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-3.5">
        {albums.map((album) => (
          <Link to={`/albums/${album._id}`} key={album._id} className="w-full">
            <AlbumItem
              title={album.title}
              albumArt={album.albumArt}
              artist={album.artist.username}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AlbumList;
