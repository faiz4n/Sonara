import formatDuration from "../../utils/formatDuration";
import { usePlayer } from "../../context/PlayerContext";

function MusicItem({ track, queue = [] }) {
  const { playTrack, currentTrack, isPlaying } = usePlayer();
  
  const isCurrentTrack = currentTrack?._id === track._id;
  const formattedDuration = formatDuration(track.duration);

  return (
    <div 
      onClick={() => playTrack(track, queue)}
      className={`flex p-4 mx-2 my-1 justify-between rounded-xl cursor-pointer hover:bg-green-600/10 ${isCurrentTrack ? "bg-green-600/20" : ""}`}
    >
      <div className="flex gap-5">
        <div className="w-15 h-15 shrink-0 rounded-xl overflow-hidden relative">
          <img
            src={track.coverImage || "track-icon.png"}
            alt=""
            className={`w-full h-full object-cover ${isCurrentTrack && isPlaying ? "animate-pulse" : ""}`}
          />
        </div>
        <div className="">
          <h1 className={`font-bold ${isCurrentTrack ? "text-green-500" : ""}`}>{track.title}</h1>
          <span className=" text-zinc-400 text-sm">{track.artist?.username}</span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2 pr-2">
        {isCurrentTrack && isPlaying ? (
          <div className="flex items-end h-[14px] gap-[2px]">
            <div className="waveform-bar"></div>
            <div className="waveform-bar"></div>
            <div className="waveform-bar"></div>
            <div className="waveform-bar"></div>
          </div>
        ) : (
          <div className="h-[14px]"></div> /* Placeholder to prevent layout shift */
        )}
        <div className="flex items-center text-xs text-zinc-400">
          {formattedDuration}
        </div>
      </div>
    </div>
  );
}

export default MusicItem;
