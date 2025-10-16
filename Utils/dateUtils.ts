/*
This function returns a future date object based on days ahead from today, including 
formatted and individual components.

*/

export function getFutureDate(daysAhead: number): {
  year: number;
  monthShort: string;
  date: string;
  formatted: string;
} {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);

  const year = date.getFullYear();
  const monthShort = date.toLocaleString('default', { month: 'short' }); // e.g. "Aug"
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const formatted = `${month}/${day}/${year}`; // MM/DD/YYYY

  return { year, monthShort, date: day, formatted };
}
