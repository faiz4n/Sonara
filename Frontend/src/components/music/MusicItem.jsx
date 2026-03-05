import formatDuration from "../../utils/formatDuration";

function MusicItem({ title, artist, duration, coverImage }) {
  const formattedDuration = formatDuration(duration);
  return (
    <div className="flex p-5 justify-between rounded-xl hover:bg-green-600/10">
      <div className="flex gap-5">
        <div className="w-15 h-15 rounded-xl overflow-hidden">
          <img
            src={coverImage}
            alt=""
            className=" w-full h-full object-cover"
          />
        </div>
        <div className="">
          <h1 className="font-bold">{title}</h1>
          <span className=" text-zinc-400 text-sm">{artist}</span>
        </div>
      </div>
      <div className="flex items-center text-xs text-white rounded px-2">
        {formattedDuration}
      </div>
    </div>
  );
}

export default MusicItem;
