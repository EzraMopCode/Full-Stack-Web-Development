'use client';

import { generateCsv, downloadCsv } from '@/lib/csv';
import { DownloadIcon } from '@/components/Icons';

export default function CsvExportButton({ records = [], type = 'consultations' }) {
  const handleExport = () => {
    let headers = [];
    let rows = [];

    if (type === 'prescriptions') {
      headers = ['Prescription ID', 'Appointment ID', 'Patient Name', 'Doctor Name', 'Specialty', 'Date', 'Diagnosis', 'Medications', 'Status'];
      rows = records.map((rx) => [
        rx.id,
        rx.appointmentId,
        rx.patientName,
        rx.doctorName,
        rx.specialty,
        rx.date,
        rx.diagnosis,
        rx.medications?.map((m) => `${m.name} (${m.dosage}, ${m.frequency})`).join('; ') || '',
        rx.pharmacyStatus
      ]);
    } else {
      headers = ['Appointment ID', 'Doctor Name', 'Specialty', 'Branch', 'Date', 'Time Slot', 'Fee (ETB)', 'Triage Stage', 'Status', 'Urgency', 'Reason', 'Notes'];
      rows = records.map((apt) => [
        apt.id,
        apt.doctorName,
        apt.specialty,
        apt.branch,
        apt.date,
        apt.timeSlot,
        apt.fee,
        apt.triageStage,
        apt.status,
        apt.urgency,
        apt.reason,
        apt.notes
      ]);
    }

    const csvContent = generateCsv(headers, rows);
    const filename = `addiscare-${type}-${new Date().toISOString().slice(0, 10)}.csv`;
    downloadCsv(filename, csvContent);
  };

  const handleTestAwkwardValues = () => {
    const headers = ['Record ID', 'Patient "Nickname"', 'Clinical Description, with commas', 'Multiline Notes'];
    const rows = [
      ['MED-TEST-01', 'Abebe "The Champion"', 'Patient reports sharp pain, intermittent nausea, and headache', 'Line 1: Started after lunch\nLine 2: Temperature elevated to 38.5C\nLine 3: Advised oral rehydration'],
      ['MED-TEST-02', 'Marta, "Senior Chemist"', 'Prescribed Amoxicillin, 500mg, "bid" for 7 days', 'Allergy: Penicillin "caution"\nRe-evaluate in 3 days']
    ];
    const csvContent = generateCsv(headers, rows);
    downloadCsv('addiscare-awkward-values-test.csv', csvContent);
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleExport}
        className="min-h-[44px] px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 cursor-pointer"
      >
        <DownloadIcon className="w-4 h-4 text-white" />
        <span>Export CSV</span>
      </button>

      <button
        type="button"
        onClick={handleTestAwkwardValues}
        title="Test CSV generation with commas, double-quotes and newlines"
        className="min-h-[44px] px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 cursor-pointer"
      >
        Test Awkward Data
      </button>
    </div>
  );
}
