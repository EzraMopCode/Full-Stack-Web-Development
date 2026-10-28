import { getPrescriptionsByPatient } from '@/data/clinicStore';
import { getSession } from '@/lib/session';
import CsvExportButton from '@/components/CsvExportButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'My Prescriptions & Medical Records | AddisCare',
  description: 'Access digital physician prescriptions and pharmacy instructions.'
};

export default async function PrescriptionsPage() {
  const session = await getSession();
  const prescriptions = getPrescriptionsByPatient(session.userId, session.role);

  return (
    <div className="space-y-6">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Digital Prescriptions & Medical Orders
          </h2>
          <p className="text-xs text-slate-500">
            Verified EFDA compliant digital medication records.
          </p>
        </div>

        <CsvExportButton records={prescriptions} type="prescriptions" />
      </div>

      {/* Prescriptions List / Empty State */}
      {prescriptions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
          <span className="text-5xl block mb-3">💊</span>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            No active prescriptions on file
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            When an attending physician issues a digital prescription during your consultation, it will appear here for pharmacy collection.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6"
            >
              {/* Rx Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-teal-700 dark:text-teal-400">
                      #{rx.id}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-xs text-slate-500">Linked to Visit #{rx.appointmentId}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    Prescribed by {rx.doctorName} ({rx.specialty})
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400 block">{rx.date}</span>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50">
                    {rx.pharmacyStatus}
                  </span>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs">
                <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">Clinical Diagnosis:</strong>
                <p className="text-slate-600 dark:text-slate-400">{rx.diagnosis}</p>
              </div>

              {/* Medications List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Prescribed Pharmaceuticals
                </h4>

                <div className="space-y-2">
                  {rx.medications?.map((med, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <strong className="text-sm font-bold text-slate-900 dark:text-white block">
                          {med.name}
                        </strong>
                        <p className="text-slate-500 mt-0.5">{med.instructions}</p>
                      </div>

                      <div className="text-left sm:text-right text-[11px] font-mono text-teal-700 dark:text-teal-400">
                        <span className="block font-bold">{med.dosage} · {med.frequency}</span>
                        <span className="text-slate-400">Duration: {med.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
