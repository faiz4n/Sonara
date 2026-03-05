function formatDuration(duration) {
  const min = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0");
  const sec = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");

  const formattedDuration = `${min}:${sec}`;

  return formattedDuration;
}

export default formatDuration;
