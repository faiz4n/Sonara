import formatDate from "../../utils/formatDate";
import TrackRow from "./TrackRow";

function ArtistTrackList({ trackList, setTrackList }) {
  return (
    <div className="flex flex-col my-10 w-full px-3 md:px-0 md:w-180  mx-2 mb-30 ">
      <div className="flex justify-between items-center w-full mb-0 flex-col md:flex-row gap-1 bg-green-100/15 p-3 max-md:p-1 rounded-tl-md rounded-tr-md ">
        <h1 className="font-bold text-lg md:text-xl">Your Tracks</h1>
        <span className="text-[10px] font-semibold text-zinc-200/40">
          {trackList.length} TOTAL TRACKS
        </span>
      </div>

      {!trackList.length && (
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
