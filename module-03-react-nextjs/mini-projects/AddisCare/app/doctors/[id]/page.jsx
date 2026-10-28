import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllDoctors, getDoctorById } from '@/data/clinicStore';
import { etb } from '@/lib/format';
import { StarIcon, MapPinIcon, DoorIcon, ClockIcon } from '@/components/Icons';

export async function generateStaticParams() {
  const doctors = getAllDoctors();
  return doctors.map((doc) => ({ id: doc.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const doctor = getDoctorById(id);
  if (!doctor) return { title: 'Doctor Not Found | AddisCare' };
  return {
    title: `${doctor.name} — ${doctor.specialty} Specialist | AddisCare`,
    description: `Book consultation with ${doctor.name}. ${doctor.qualification} at ${doctor.branch}.`
  };
}

export default async function DoctorDetailPage({ params }) {
  const { id } = await params;
  const doctor = getDoctorById(id);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-400 flex items-center gap-2">
        <Link href="/" className="hover:text-teal-600">Home</Link>
        <span>&rsaquo;</span>
        <Link href="/doctors" className="hover:text-teal-600">Doctors</Link>
        <span>&rsaquo;</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold">{doctor.name}</span>
      </nav>

      {/* Main Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-teal-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start justify-between gap-6">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/50 mb-3">
            {doctor.specialty}
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {doctor.name}
          </h1>
          <p className="text-sm text-teal-700 dark:text-teal-400 font-semibold mt-1">
            {doctor.qualification}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400">
              <StarIcon className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{doctor.rating.toFixed(1)}</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">({doctor.reviewCount} verified reviews)</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 font-semibold">
              <MapPinIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>{doctor.branch}</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
              <DoorIcon className="w-4 h-4 text-slate-400" />
              <span>Room {doctor.room}</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
              <ClockIcon className="w-4 h-4 text-slate-400" />
              <span>{doctor.experienceYears} Yrs Experience</span>
            </span>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/60 text-center w-full md:w-auto min-w-[200px]">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
            Consultation Fee
          </span>
          <span className="text-2xl font-black text-teal-700 dark:text-teal-400 font-mono block mt-0.5">
            {etb(doctor.consultationFee)}
          </span>
          <Link
            href={`/book/${doctor.id}`}
            className="mt-3 min-h-[44px] px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            Book Appointment &rarr;
          </Link>
        </div>
      </div>

      {/* Clinical Biography */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Physician Biography & Clinical Expertise
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {doctor.bio}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <strong className="text-slate-900 dark:text-white block mb-1">Clinical Practice Days:</strong>
            <p className="text-slate-500">{doctor.availableDays.join(', ')}</p>
          </div>
          <div>
            <strong className="text-slate-900 dark:text-white block mb-1">Typical Slots:</strong>
            <p className="text-slate-500 font-mono">{doctor.timeSlots.join(' · ')}</p>
          </div>
        </div>
      </section>

    </div>
  );
}
