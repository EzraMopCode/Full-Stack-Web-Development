import Link from 'next/link';
import Image from 'next/image';
import { getAllDoctors, SPECIALTIES } from '@/data/clinicStore';
import DoctorCard from '@/components/DoctorCard';
import { etb } from '@/lib/format';
import {
  HeartPulseIcon,
  BabyIcon,
  StethoscopeIcon,
  ToothIcon,
  DropletIcon,
  BoneIcon,
  AmbulanceIcon,
  MapPinIcon,
  LightningIcon,
  ArrowRightIcon
} from '@/components/Icons';

export const metadata = {
  title: 'AddisCare — Premier Medical Clinic Diary & Doctor Booking',
  description: 'Book certified doctors, schedule specialist consultations, and track live clinical triage in Addis Ababa.'
};

const CLINICAL_DEPARTMENTS = [
  { name: 'Cardiology', Icon: HeartPulseIcon, desc: 'Heart & hypertension' },
  { name: 'Pediatrics', Icon: BabyIcon, desc: 'Child wellness & care' },
  { name: 'General Medicine', Icon: StethoscopeIcon, desc: 'Primary & family care' },
  { name: 'Dental Surgery', Icon: ToothIcon, desc: 'Oral & restorative care' },
  { name: 'Dermatology', Icon: DropletIcon, desc: 'Skin & allergic care' },
  { name: 'Orthopedics', Icon: BoneIcon, desc: 'Joint & sports therapy' }
];

export default function HomePage() {
  const doctors = getAllDoctors();
  const featuredDoctors = doctors.slice(0, 3);

  return (
    <div className="space-y-16 py-8 sm:py-12">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl border border-teal-800/40">
          
          {/* Subtle Ambient Graphic Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

          {/* Hero Decorative Watermark Emblem */}
          <div className="absolute -right-6 -bottom-6 w-72 h-72 opacity-20 pointer-events-none hidden lg:block">
            <Image
              src="/logo.png"
              alt=""
              width={288}
              height={288}
              className="w-full h-full object-contain filter drop-shadow-2xl"
              aria-hidden="true"
            />
          </div>

          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
              <span>🇪🇹</span>
              <span>Modern Clinical Healthcare · Addis Ababa</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Compassionate Healthcare, Scheduled Seamlessly.
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Book consultations with senior specialists across Bole, Kazanchis, and Sarbet branches. Track your live clinical triage queue in real time, and download verified digital prescriptions with zero hassle.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/doctors"
                className="min-h-[48px] px-8 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-2xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              >
                Find a Doctor &rarr;
              </Link>
              <Link
                href="/portal/appointments"
                className="min-h-[48px] px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl backdrop-blur-sm border border-white/10 transition-colors flex items-center justify-center text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Patient Portal
              </Link>
            </div>
          </div>

          {/* Quick Emergency Banner Bar with SVG Icons */}
          <div className="mt-10 pt-6 border-t border-teal-800/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0">
                <AmbulanceIcon className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <strong className="text-white block font-semibold">24/7 Red Cross Ambulance:</strong>
                <a href="tel:907" className="text-teal-400 hover:underline font-mono font-bold">Dial 907 (Citywide)</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0">
                <MapPinIcon className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <strong className="text-white block font-semibold">Flagship Branch:</strong>
                <span>Cameroon St, Next to Bole Medhanealem</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0">
                <LightningIcon className="w-5 h-5 text-teal-300" />
              </div>
              <div>
                <strong className="text-white block font-semibold">Live Triage Queue:</strong>
                <span>Zero waiting room guesswork</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Medical Specialties Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
              Comprehensive Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Clinical Specialties & Departments
            </h2>
          </div>
          <Link
            href="/doctors"
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1.5"
          >
            <span>Browse all departments</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CLINICAL_DEPARTMENTS.map((dept) => {
            const Icon = dept.Icon;
            return (
              <Link
                key={dept.name}
                href={`/doctors?specialty=${encodeURIComponent(dept.name)}`}
                className="p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-teal-400 dark:hover:border-teal-600 shadow-sm hover:shadow-md transition-all text-center group flex flex-col items-center justify-center min-h-[130px] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                </div>
                <h3 className="font-bold text-xs text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                  {dept.name}
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{dept.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Doctors Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
              Certified Specialists
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Top Attending Physicians
            </h2>
          </div>
          <Link
            href="/doctors"
            className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
          >
            View all 6 specialists &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      </section>

      {/* Addis Ababa Clinic Locations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 dark:bg-slate-900/60 rounded-3xl p-8 border border-slate-200/60 dark:border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Accessible Care Across the Capital
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Visit any of our fully equipped clinical centers with state-of-the-art diagnostic labs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800">
              <span className="text-lg font-bold text-teal-700 dark:text-teal-400 block mb-1">
                Bole Medhanealem Center
              </span>
              <p className="text-slate-600 dark:text-slate-300">Cameroon St, Near Medhanealem Mall</p>
              <p className="text-slate-400 mt-2 font-mono">Tel: +251 11 661 4520</p>
              <p className="text-teal-600 font-semibold mt-1">Cardiology, General Medicine, Orthopedics</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800">
              <span className="text-lg font-bold text-teal-700 dark:text-teal-400 block mb-1">
                Kazanchis Main Facility
              </span>
              <p className="text-slate-600 dark:text-slate-300">Menelik II Ave, Near ECA Headquarters</p>
              <p className="text-slate-400 mt-2 font-mono">Tel: +251 11 551 8930</p>
              <p className="text-teal-600 font-semibold mt-1">Pediatrics, Dermatology, Diagnostic Imaging</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/70 dark:border-slate-800">
              <span className="text-lg font-bold text-teal-700 dark:text-teal-400 block mb-1">
                Sarbet Specialized Center
              </span>
              <p className="text-slate-600 dark:text-slate-300">South Africa St, Adjacent to Vatican Embassy</p>
              <p className="text-slate-400 mt-2 font-mono">Tel: +251 11 371 9044</p>
              <p className="text-teal-600 font-semibold mt-1">Dental Surgery, Maxillofacial Suite</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
