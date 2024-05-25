/**
 * Converts possible null number to string & formats possible integers to have 3 decimal places
 * @param expectedNumber - The number to convert
 * @returns The converted number / string
 */
export function convertNumber(expectedNumber: number | null) {
  if (expectedNumber === null) return "-.--";
  if (expectedNumber % 1 === 0) {
    return expectedNumber + ".000";
  }

  return expectedNumber.toFixed(3);
}

/**
 * Formats a date to a string
 * @param date - The date to format
 * @returns The formatted date
 */
export function formatDateForData(date: Date) {
  return (
    ("0" + date.getDate()).slice(-2) +
    "." +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "." +
    date.getFullYear() +
    " " +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2)
  );
}

/**
 * Sets the meta tags for the page
 * @param title - The title to set
 * @param desc - The description to set
 */
export function setMeta(title: string, desc: string) {
  document.title = title;

  const el = document.querySelector("meta[name='description']");
  if (el !== null) el.setAttribute("content", desc);

  const og_meta = document.querySelector("meta[property='og:description']");
  if (og_meta !== null) og_meta.setAttribute("content", desc);

  const twitter_meta = document.querySelector(
    "meta[property='twitter:description']"
  );
  if (twitter_meta !== null) twitter_meta.setAttribute("content", desc);
}
