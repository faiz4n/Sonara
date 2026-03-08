import formatDuration from "../../utils/formatDuration";

function AlbumTrackRow({ title, artist, duration, idx }) {
  const trackDuration = formatDuration(duration);
  return (
    <div className="flex items-center md:border-b border-zinc-100/8 max-md:py-4 md:p-4 ">
      <h1 className="flex-1">{idx + 1}</h1>
      <div className="flex-8">
        <h1 className=" text-white">{title}</h1>
        <h1 className="text-[11px] md:hidden">{artist}</h1>
      </div>
      <h1 className="flex-8 max-md:hidden">{artist}</h1>
      <h1 className="flex-1 text-xs">{trackDuration}</h1>
    </div>
  );
}

export default AlbumTrackRow;
