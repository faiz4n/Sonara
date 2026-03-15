import MusicItem from "./MusicItem";

function MusicList({ tracks = [] }) {
  return (
    <div>
      {tracks && tracks.length > 0 ? (
        <ul className="flex flex-col ">
          {tracks.map((track) => (
            <li key={track._id}>
              <MusicItem
                title={track.title}
                artist={track.artist?.username}
                duration={track.duration}
                coverImage={track.coverImage}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-10 text-gray-400">
          <p className="text-lg">No tracks available</p>
          <p className="text-sm">Start by uploading some music</p>
        </div>
      )}
    </div>
  );
}

export default MusicList;
