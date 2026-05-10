import { createContext, useContext, useState, useEffect, useRef } from "react";

const PlayerContext = createContext();

export function usePlayer() {
  return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);   // seconds
  const [duration, setDuration] = useState(0);   // seconds
  const [volume, setVolume] = useState(1);        // 0.0 – 1.0
  const [queue, setQueue] = useState([]);         // ordered list of tracks

  const audioRef = useRef(new Audio());

  // ─── Audio event listeners ─────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime     = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    // When a track ends, automatically advance to the next one in the queue.
    // We read the latest queue/currentTrack safely via the setter callbacks.
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTrack((prev) => {
        if (!prev) return null;
        setQueue((q) => {
          const idx  = q.findIndex((t) => t._id === prev._id);
          const next = q[idx + 1];
          if (next) {
            audio.src = next.uri;
            audio.play().then(() => {
              setIsPlaying(true);
              setCurrentTrack(next);
            }).catch(console.error);
          }
          return q;
        });
        return prev;
      });
    };

    audio.addEventListener("timeupdate",     updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended",          handleEnded);

    return () => {
      audio.removeEventListener("timeupdate",     updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended",          handleEnded);
    };
  }, []);

  // ─── Sync volume ───────────────────────────────────────────────────
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  // ─── Internal helper ───────────────────────────────────────────────
  const playTrackFromQueue = (track) => {
    setCurrentTrack(track);
    audioRef.current.src = track.uri;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.error("Audio playback failed:", err));
  };

  // ─── Public API ────────────────────────────────────────────────────

  // Called when user clicks a MusicItem.
  // trackQueue = full list of tracks so skip buttons work.
  const playTrack = (track, trackQueue = []) => {
    if (currentTrack?._id === track._id) {
      togglePlay();
      return;
    }
    if (trackQueue.length) setQueue(trackQueue);
    playTrackFromQueue(track);
  };

  const togglePlay = () => {
    if (!currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const seek = (timeInSeconds) => {
    if (!currentTrack) return;
    audioRef.current.currentTime = timeInSeconds;
    setProgress(timeInSeconds);
  };

  // Skip to next track in queue
  const skipNext = () => {
    if (!currentTrack || !queue.length) return;
    const idx  = queue.findIndex((t) => t._id === currentTrack._id);
    const next = queue[idx + 1];
    if (next) playTrackFromQueue(next);
  };

  // Restart current track if > 3s in, otherwise go to previous
  const skipPrevious = () => {
    if (!currentTrack || !queue.length) return;
    if (audioRef.current.currentTime > 3) {
      seek(0);
      return;
    }
    const idx  = queue.findIndex((t) => t._id === currentTrack._id);
    const prev = queue[idx - 1];
    if (prev) playTrackFromQueue(prev);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        setVolume,
        queue,
        setQueue,
        playTrack,
        togglePlay,
        seek,
        skipNext,
        skipPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
