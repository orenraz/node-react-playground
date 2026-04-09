/**
 * Converts a Date or string to an ISO date string.
 * If input is already a string, returns as is.
 * @param date Date or string
 * @returns ISO date string
 */
export function toIsoDateString(date: Date | string): string {
  if (date instanceof Date) {
    return date.toISOString();
  }
  return date;
}

/**
 * Parses an ISO date string and returns a Date object.
 * Throws an error if the string is not a valid date.
 * @param dateStr ISO date string
 * @returns Date object
 */
export function parseIsoDate(dateStr: string): Date {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }
  return date;
}
