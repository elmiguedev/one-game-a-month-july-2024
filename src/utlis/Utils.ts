const lerpPosition = (x1: number, y1: number, x2: number, y2: number, t: number) => {
  return {
    x: x1 + (x2 - x1) * t,
    y: y1 + (y2 - y1) * t
  }
}

const getTimeText = (timer: number): string => {
  const minutes = 9 + Math.floor(timer / 60);
  const seconds = timer % 60;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const secondsStr = seconds < 10 ? "0" + seconds : seconds;
  return minutesStr + ":" + secondsStr;
}

export const Utils = {
  lerpPosition,
  getTimeText
}