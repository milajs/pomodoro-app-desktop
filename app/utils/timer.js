export default function formatTimeToString(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

  return `${minutes}:${formattedSeconds}`
}
