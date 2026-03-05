import AlbumItem from "./AlbumItem";

function AlbumList({ albums }) {
  return (
    <div>
      <ul className="flex gap-5 flex-wrap">
        {albums.map((album) => (
          <li key={album._id}>
            <AlbumItem title={album.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumList;
