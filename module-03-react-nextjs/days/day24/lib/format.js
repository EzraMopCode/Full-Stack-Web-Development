/**
 * Exercise 6 & Requirement:
 * Shared format module exporting etb, when, and relative.
 * Used across the application so every price, date, and elapsed time is consistent.
 */

/**
 * Format numerical amount to Ethiopian Birr (ETB)
 * @param {number|string} amount
 * @param {boolean} includeDecimals
 * @returns {string} e.g. "240.00 ETB" or "750 ETB"
 */
export function etb(amount, includeDecimals = false) {
  const num = Number(amount) || 0;
  const formatted = includeDecimals
    ? num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : num.toLocaleString('en-US');
  return `${formatted} ETB`;
}

/**
 * Format ISO date string into absolute human-readable date & time
 * @param {string|Date} dateInput
 * @returns {string} e.g. "Oct 28, 2026, 11:30 AM"
 */
export function when(dateInput) {
  if (!dateInput) return '—';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput);

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Format date string into human relative time
 * @param {string|Date} dateInput
 * @returns {string} e.g. "5 mins ago", "just now", "in 12 mins"
 */
export function relative(dateInput) {
  if (!dateInput) return '—';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return '—';

  const now = Date.now();
  const diffMs = now - d.getTime();
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHours = Math.round(diffMin / 60);
  const diffDays = Math.round(diffHours / 24);

  if (Math.abs(diffSec) < 30) return 'just now';
  if (diffMin < 60) return `${diffMin} min${diffMin === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
}
