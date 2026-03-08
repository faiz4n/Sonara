import { Clock } from "lucide-react";
import AlbumTrackRow from "../UI/AlbumTrackRow";

function AlbumTrackList({ album }) {
  return (
    <div className="mt-13">
      <h1 className="text-xl font-semibold">Tracks</h1>
      <div className="flex flex-col max-md:text-md text-zinc-300/60">
        <div className="max-md:hidden flex border-b border-zinc-100/8 p-4">
          <div className="flex-1">#</div>
          <div className="flex-8">Title</div>
          <div className="flex-8 max-md:hidden">Artist</div>
          <div className="flex-1">
            <Clock size={18} />
          </div>
        </div>
        {album?.musics?.map((track, idx) => (
          <AlbumTrackRow
            key={track._id}
            artist={album?.artist?.username}
            title={track.title}
            duration={track.duration}
            idx={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default AlbumTrackList;
