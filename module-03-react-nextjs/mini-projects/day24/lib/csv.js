/**
 * Exercise 7 & Requirement:
 * CSV Export utility that strictly survives awkward data containing:
 * - Commas (e.g. "Atlas, Bole")
 * - Quotation marks (e.g. Abebe "The Chef")
 * - Embedded newlines (e.g. "Ring bell.\nLeave on porch.")
 *
 * Implements RFC 4180 CSV escaping rules:
 * Any cell with a comma, quote, or newline MUST be wrapped in double quotes,
 * and any internal double quote MUST be escaped by doubling it ("").
 */

export function escapeCsvCell(val) {
  if (val === null || val === undefined) {
    return '';
  }
  const str = String(val);

  // If cell contains comma, quote, or newline, escape and quote it
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function ordersToCsv(ordersList = []) {
  const headers = [
    'Order ID',
    'Customer Name',
    'Phone',
    'Neighbourhood',
    'Address',
    'Status',
    'Date',
    'Total (ETB)',
    'Items Summary',
    'Customer Notes'
  ];

  const headerLine = headers.map(escapeCsvCell).join(',');

  const rows = ordersList.map((order) => {
    const itemsSummary = (order.items || [])
      .map((item) => `${item.name} (${item.quantity}x @ ${item.price} ETB)`)
      .join('; ');

    const rowCells = [
      order.id,
      order.name,
      order.phone || '',
      order.area,
      order.address,
      order.status,
      order.createdAt ? order.createdAt.split('T')[0] : '',
      order.total,
      itemsSummary,
      order.notes || ''
    ];

    return rowCells.map(escapeCsvCell).join(',');
  });

  // Prepend UTF-8 BOM (\uFEFF) so Microsoft Excel opens it without character corruption
  return '\uFEFF' + [headerLine, ...rows].join('\r\n');
}

export function downloadCsvFile(filename, csvData) {
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
