export function formatTimeToString(time) {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

  return `${minutes}:${formattedSeconds}`
}

export function getNewSeries(prevStage, prevSeries) {
  if (prevSeries === 4 && prevStage === 'relax') {
    return 0
  }

  if (prevStage === 'work') {
    return prevSeries + 1
  }

  return prevSeries
}
