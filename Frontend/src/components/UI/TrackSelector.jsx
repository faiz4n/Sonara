function TrackSelector({ trackList, setSelectedTracks }) {
  return (
    <>
      <p className="text-[11px] my-1 text-zinc-300">Select Tracks</p>
      <div className="flex flex-col gap-2 h-40 overflow-y-auto">
        <ul className="flex flex-col gap-2">
          {trackList?.map((track) => (
            <li key={track._id}>
              <label className="flex items-center gap-2 text-sm cursor-pointer bg-green-100/15 p-2 rounded-md">
                <input
                  type="checkbox"
                  className="accent-green-500 "
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTracks((prev) => [...prev, track._id]);
                    } else {
                      setSelectedTracks((prev) =>
                        prev.filter((t) => t._id !== track._id),
                      );
                    }
                  }}
                />
                <p>{track.title}</p>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TrackSelector;
