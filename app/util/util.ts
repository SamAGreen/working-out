export function formatDateFromISO(isoString: string): string {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
