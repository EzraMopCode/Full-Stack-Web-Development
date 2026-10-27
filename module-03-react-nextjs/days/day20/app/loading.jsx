export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 font-medium">Loading delicious meals...</p>
    </div>
  );
}
