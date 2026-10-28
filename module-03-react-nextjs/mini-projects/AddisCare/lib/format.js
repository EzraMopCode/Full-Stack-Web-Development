/**
 * Shared Formatting Module for AddisCare
 * Ensures consistent ETB currency, absolute dates, and relative timestamps across the entire application.
 */

export function etb(amount, includeDecimals = false) {
  const num = Number(amount) || 0;
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0,
  });
  return `${formatted} ETB`;
}

export function when(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (e) {
    return dateString;
  }
}

export function relative(dateString) {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffSec < 0) {
      const futureSec = Math.abs(diffSec);
      if (futureSec < 3600) return `in ${Math.ceil(futureSec / 60)} mins`;
      if (futureSec < 86400) return `in ${Math.floor(futureSec / 3600)} hours`;
      return `in ${Math.floor(futureSec / 86400)} days`;
    }

    if (diffSec < 60) return 'just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} mins ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hours ago`;
    return `${Math.floor(diffSec / 86400)} days ago`;
  } catch (e) {
    return 'recently';
  }
}
