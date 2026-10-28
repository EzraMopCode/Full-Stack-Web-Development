import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
      <span className="text-6xl">🩺</span>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        Record or Page Not Found
      </h2>
      <p className="text-xs text-slate-500 max-w-sm">
        The requested doctor profile, appointment ticket, or clinical page does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="min-h-[44px] px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-colors inline-block"
      >
        &larr; Return to AddisCare Home
      </Link>
    </div>
  );
}
