import formatDuration from "../../utils/formatDuration";
import { usePlayer } from "../../context/PlayerContext";

function AlbumTrackRow({ track, artist, queue, idx }) {
  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const isCurrentTrack = currentTrack?._id === track._id;
  const trackDuration = formatDuration(track.duration);

  return (
    <div
      onClick={() => playTrack(track, queue)}
      className={`flex items-center md:border-b border-zinc-100/8 max-md:p-2 md:p-4 cursor-pointer rounded-lg hover:bg-green-600/10 transition-colors ${isCurrentTrack ? "bg-green-600/20" : ""}`}
    >
      {/* Track number or waveform animation */}
      <div className="flex-1">
        {isCurrentTrack && isPlaying ? (
          <div className="flex items-end h-[14px] gap-[2px]">
            <div className="waveform-bar"></div>
            <div className="waveform-bar"></div>
            <div className="waveform-bar"></div>
            <div className="waveform-bar"></div>
          </div>
        ) : (
          <span className={isCurrentTrack ? "text-green-500" : ""}>{idx + 1}</span>
        )}
      </div>

      {/* Title + artist (mobile) */}
      <div className="flex-8">
        <h1 className={`font-medium ${isCurrentTrack ? "text-green-500" : "text-white"}`}>{track.title}</h1>
        <h1 className="text-[11px] md:hidden text-zinc-400">{artist}</h1>
      </div>

      {/* Artist (desktop) */}
      <h1 className="flex-8 max-md:hidden">{artist}</h1>

      {/* Duration */}
      <h1 className="flex-1 text-xs">{trackDuration}</h1>
    </div>
  );
}

export default AlbumTrackRow;
