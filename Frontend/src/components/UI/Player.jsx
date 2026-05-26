import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";
import formatDuration from "../../utils/formatDuration";

function Player() {
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    duration, 
    volume, 
    setVolume, 
    togglePlay, 
    seek,
    skipNext,
    skipPrevious,
  } = usePlayer();

  if (!currentTrack) {
    return null; // Don't show player if nothing is playing
  }

  const handleProgressClick = (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newProgress = (clickX / width) * duration;
    seek(newProgress);
  };

  const handleVolumeClick = (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newVolume = Math.max(0, Math.min(1, clickX / width));
    setVolume(newVolume);
  };

  const toggleMute = () => {
    if (volume > 0) setVolume(0);
    else setVolume(1);
  };

  // Scroll wheel on the volume slider: scroll up = louder, scroll down = quieter
  const handleVolumeScroll = (e) => {
    const delta = e.deltaY < 0 ? 0.05 : -0.05;
    setVolume((prev) => Math.max(0, Math.min(1, prev + delta)));
  };

  const progressPercent = duration ? (progress / duration) * 100 : 0;
  const volumePercent = volume * 100;

  return (
    <div className="bg-green-700/20 flex flex-wrap md:flex-nowrap justify-between items-center px-4 py-3 gap-y-3 md:gap-y-0 sticky bottom-0 max-md:bottom-20 z-50 backdrop-blur-md md:ml-80">
      {/* //Track */}
      <div className="flex gap-2 items-center w-1/2 md:w-1/4">
        <div className="rounded-full h-10 w-10 overflow-hidden shrink-0">
          <img 
            className="h-full w-full object-cover" 
            src={currentTrack.coverImage || "/track-icon.png"} 
            alt={currentTrack.title} 
          />
        </div>
        <div className="truncate">
          <h1 className="text-sm font-semibold truncate text-green-500">{currentTrack.title}</h1>
          <h2 className="text-xs text-gray-300 truncate">{currentTrack.artist?.username || "Unknown Artist"}</h2>
        </div>
      </div>

      {/* //Controls */}
      <div className="flex gap-2 items-center justify-end md:justify-center w-1/2 md:w-1/4 order-1 md:order-none">
        <div onClick={skipPrevious} className="hidden sm:flex items-center p-2.5 rounded-full justify-center hover:bg-green-50/10 cursor-pointer text-gray-300 hover:text-white active:scale-90 transition-transform">
          <SkipBack size={20} />
        </div>
        <div 
          onClick={togglePlay}
          className="bg-green-500 p-2.5 rounded-full flex items-center justify-center hover:scale-105 cursor-pointer text-black transition-transform"
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
        </div>
        <div onClick={skipNext} className="hidden sm:flex items-center p-2.5 rounded-full justify-center hover:bg-green-50/10 cursor-pointer text-gray-300 hover:text-white active:scale-90 transition-transform">
          <SkipForward size={20} />
        </div>
      </div>

      {/* //Player (Progress) */}
      <div className="w-full md:w-1/3 flex items-center gap-3 order-3 md:order-none">
        <span className="text-xs text-gray-400 w-8 text-right">{formatDuration(progress)}</span>
        
        {/* Progress Track */}
        <div 
          onClick={handleProgressClick}
          className="w-full h-1.5 bg-gray-600 rounded-full overflow-hidden cursor-pointer flex items-center group relative"
        >
          {/* Filled Bar */}
          <div 
            className="h-full bg-green-500 rounded-full group-hover:bg-green-400 transition-all duration-100 ease-linear" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <span className="text-xs text-gray-400 w-8">{formatDuration(duration)}</span>
      </div>

      {/* //Volume */}
      <div className="hidden md:flex w-1/4 justify-end items-center gap-2 order-4 md:order-none">
        <div onClick={toggleMute} className="cursor-pointer text-gray-400 hover:text-white">
          {volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </div>
        <div 
          onClick={handleVolumeClick}
          onWheel={handleVolumeScroll}
          className="w-24 h-1.5 bg-gray-600 rounded-full overflow-hidden cursor-pointer group"
        >
          <div 
            className="h-full bg-green-500 rounded-full group-hover:bg-green-400 transition-all duration-100 ease-linear" 
            style={{ width: `${volumePercent}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Player;
