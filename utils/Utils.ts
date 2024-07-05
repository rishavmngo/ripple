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

export function displayDuration(timeInMiliseconds: number): string {
  const timeInMinutes = timeInMiliseconds / (1000 * 60);

  if (timeInMinutes < 60) {
    return `${Math.round(timeInMinutes)} mins`;
  } else {
    return `${(timeInMinutes / 60).toFixed(2)} hr`;
  }
}

export function getRandomColorFromPallet(): string {
  const index = Math.floor(Math.random() * (COLOR_PALLETE.length - 1));

  return COLOR_PALLETE[index];
}
