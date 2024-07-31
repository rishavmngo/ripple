export const COLOR_PALLETE = [
  '#1D1D1D',
  '#DEECED',
  '#FFC7ED',
  '#FFB4C2',
  '#F4A261',
  '#F9D689',
  '#80C4E9',
  '#C80036',
  '#80B9AD',
];

export function displayDuration(
  timeInMinutes: number,
  longUnitName: boolean = false,
): string {
  if (timeInMinutes < 60) {
    return `${padNumber(timeInMinutes, 2)} ${
      longUnitName ? 'minutes' : 'mins'
    }`;
  } else if (timeInMinutes % 60 === 0) {
    return `${padNumber(timeInMinutes / 60, 2)} ${
      longUnitName ? 'hours' : 'hrs'
    }`;
  } else {
    return `${(timeInMinutes / 60).toFixed(2)} ${
      longUnitName ? 'hours' : 'hrs'
    }`;
  }
}
export function padNumber(num: number, pad: number, char = '0') {
  if (num == 0) {
    pad = 1;
  }
  return String(num).padStart(pad, char);
}

export function getRandomColorFromPallet(): string {
  const index = Math.floor(Math.random() * (COLOR_PALLETE.length - 1));

  return COLOR_PALLETE[index];
}

export function displayDate(date) {
  const day = date.getDate();
  const dayOfWeek = date.toString().split(' ')[0];
  const today = new Date();

  if (date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
    return 'today';
  }

  return `${day} ${dayOfWeek}`;
}

export function sleep(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
