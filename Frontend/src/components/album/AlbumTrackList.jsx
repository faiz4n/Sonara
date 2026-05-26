import { Clock } from "lucide-react";
import AlbumTrackRow from "../UI/AlbumTrackRow";

function AlbumTrackList({ album }) {
  return (
    <div className="mt-13">
      <h1 className="text-xl font-semibold max-md:my-3">Tracks</h1>
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
            track={track}
            artist={album?.artist?.username}
            queue={album?.musics || []}
            idx={idx}
          />
        ))}
      </div>
    </div>
  );
}

export default AlbumTrackList;
