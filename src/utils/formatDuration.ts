function formatDuration(timeInSeconds: number) {
  let hours = Math.floor(timeInSeconds / 3600);
  let minutes = Math.floor((timeInSeconds % 3600) / 60);
  let seconds = Math.floor(timeInSeconds % 60);

  let formattedHours = hours > 0 ? `${hours}:` : "";
  let formattedMinutes = minutes > 0 ? `${minutes}:` : "";
  let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
}

export default formatDuration