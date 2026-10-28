export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-72 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 animate-pulse">
            <div className="h-40 bg-slate-200 dark:bg-slate-800 rounded-xl mb-4" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
