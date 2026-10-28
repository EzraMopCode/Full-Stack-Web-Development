export default function ClinicDashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
      </div>
    </div>
  );
}
