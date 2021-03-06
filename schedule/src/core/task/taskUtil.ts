
export const week = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// convert an array of weekday string representation into index 0 ~ 6,
// with 0 for Sunday to 6 for Saturday.
export const convertDays = (days: string[]): number[] => {
  const indexes = days
    .filter((d, pos) => days.indexOf(d) === pos) // remove duplicate
    .map(day => week.indexOf(day.toLowerCase()))
    .filter(i => i !== -1)
    .sort((a, b) => a - b);
  return indexes;
}