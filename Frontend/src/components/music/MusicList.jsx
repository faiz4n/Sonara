import MusicItem from "./MusicItem";

function MusicList({ tracks }) {
  return (
    <div>
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
    </div>
  );
}

export default MusicList;
