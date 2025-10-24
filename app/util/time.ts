export function getCurrentTimestamp(): string {
  const now = new Date();

  const pad = (n: number, width = 2) => String(n).padStart(width, '0');

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1); // months are 0-indexed
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());
  const milliseconds = pad(now.getMilliseconds(), 3);

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}


export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
