'use client';

import React, { useState } from 'react';
import { ordersToCsv, downloadCsvFile } from '@/lib/csv';

/**
 * Exercise 7 & Requirement:
 * CSV Export Button with active export feedback and test button
 * specifically validating awkward values (quotes, commas, newlines).
 */
export default function CsvExportButton({ orders = [] }) {
  const [exporting, setExporting] = useState(false);

  function handleExport() {
    setExporting(true);
    try {
      const csv = ordersToCsv(orders);
      const filename = `addis-eats-orders-${new Date().toISOString().split('T')[0]}.csv`;
      downloadCsvFile(filename, csv);
    } catch (err) {
      console.error('Failed to export CSV:', err);
    } finally {
      setTimeout(() => setExporting(false), 800);
    }
  }

  // Demonstration test for Exercise 7 requirement: Awkward values test
  function handleTestAwkwardExport() {
    const awkwardTestOrders = [
      {
        id: '999901',
        name: 'Abebe "The King", Kebede',
        phone: '0911223344',
        area: 'Bole, Atlas Sector',
        address: 'House #44, "Compound A", Near Ring Road',
        status: 'delivered',
        createdAt: '2026-10-28T08:00:00.000Z',
        total: 1200,
        items: [{ name: 'Special Tibs, Extra Spicy', price: 600, quantity: 2 }],
        notes: 'Doorbell broken.\nPlease ring phone,\nleave with guard.'
      }
    ];

    const csv = ordersToCsv(awkwardTestOrders);
    downloadCsvFile('addis-eats-awkward-values-test.csv', csv);
  }

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={handleExport}
        disabled={exporting}
        className="inline-flex items-center gap-2 px-3.5 py-2 bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-bold rounded-lg shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 cursor-pointer"
        aria-label="Export order history as CSV file"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {exporting ? 'Generating CSV...' : 'Export CSV'}
      </button>

      <button
        onClick={handleTestAwkwardExport}
        title="Test CSV escaping with commas, quotation marks, and multiline notes"
        className="px-2.5 py-2 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-mono rounded-lg transition-colors cursor-pointer"
      >
        Test Awkward CSV
      </button>
    </div>
  );
}
