// `ls -l` columns for the projects and post listings
export const lsDate = (d: Date) =>
  d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).replace(',', '');

export const lsSize = (bytes: number) => `${(bytes / 1024).toFixed(1)}K`;

// 'Mar 2024 — Present' -> '2024-03 → now'
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const shortDate = (d: string) => {
  const [m, y] = d.trim().split(' ');
  return m === 'Present' ? 'now' : `${y}-${String(months.indexOf(m) + 1).padStart(2, '0')}`;
};
export const shortPeriod = (p: string) => p.split('—').map(shortDate).join(' → ');
