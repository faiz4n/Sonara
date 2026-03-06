import { Music, Pen, Trash } from "lucide-react";
import { deleteMusicById } from "../../services/music.service";
import formatDuration from "../../utils/formatDuration";
function TrackRow({
  title,
  duration,
  uploadDate,
  id,
  setTrackList,
  coverImage,
}) {
  async function handleDeleteTrack(id) {
    const res = await deleteMusicById(id);
    console.log(res);
    // Update UI immediately by removing the deleted track
    setTrackList((prev) => prev.filter((track) => track._id !== id));
  }
  return (
    <div className="flex items-center bg-green-900/20 border border-zinc-100/10 p-3 border-t-0 ">
      <div className="flex-1 items-center flex gap-2">
        <div className="bg-green-600/20 w-8 h-8 overflow-hidden rounded shrink-0">
          {/* <Music size={20} color="green" /> */}
          <img
            src={coverImage}
            alt=""
            className="w-full h-full object-cover "
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xs font-bold">{title}</h1>
          <p className="text-[10px] font-semibold text-zinc-200/30">
            {formatDuration(duration)}
          </p>
        </div>
      </div>
      <div className="flex-1 text-center">
        <span className="text-xs text-zinc-200/50 italic">{uploadDate}</span>
      </div>
      <div className="flex-1 flex gap-4 justify-end text-zinc-300/80">
        <Trash
          size={15}
          className="cursor-pointer"
          onClick={() => {
            handleDeleteTrack(id);
          }}
        />
      </div>
    </div>
  );
}

export default TrackRow;
