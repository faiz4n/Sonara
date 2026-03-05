import formatDate from "../../utils/formatDate";
import TrackRow from "./TrackRow";

function ArtistTrackList({ trackList, setTrackList }) {
  return (
    <div className="flex flex-col my-10 w-180 ">
      <div className="flex justify-between items-center w-full mb-3">
        <h1 className="font-bold text-xl">Your Tracks</h1>
        <span className="text-[10px] font-semibold text-zinc-200/40">
          {trackList.length} TOTAL TRACKS
        </span>
      </div>

      {trackList.length > 0 ? (
        <div className="flex items-center w-full bg-green-100/15 p-3 rounded-tl-md rounded-tr-md">
          <>
            <span className="flex-1 text-[10px] font-semibold text-zinc-200/70">
              TRACK INFO
            </span>
            <span className="flex-1 text-center text-[10px] font-semibold text-zinc-200/70">
              RELEASE DATE
            </span>
            <span className="flex-1 text-right text-[10px] font-semibold text-zinc-200/70">
              ACTIONS
            </span>
          </>
        </div>
      ) : (
        <h1 className="text-center text-zinc-300/50 text-xs mt-5">
          Your uploaded tracks will appear here.
        </h1>
      )}

      <ul className="flex flex-col w-full">
        {trackList.map((track) => (
          <li key={track._id}>
            <TrackRow
              title={track.title}
              duration={track.duration}
              uploadDate={formatDate(track.createdAt)}
              id={track._id}
              setTrackList={setTrackList}
              coverImage={track.coverImage}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistTrackList;
