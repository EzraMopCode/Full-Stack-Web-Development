import { getAllDoctors } from '@/data/clinicStore';
import DoctorCard from '@/components/DoctorCard';
import SpecialtyBar from '@/components/SpecialtyBar';
import { StethoscopeIcon } from '@/components/Icons';

export const metadata = {
  title: 'Specialist Doctors & Medical Consultants | AddisCare',
  description: 'Browse certified cardiologists, pediatricians, dentists, dermatologists, and surgeons in Addis Ababa.'
};

export default async function DoctorsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const activeSpecialty = resolvedParams?.specialty || null;
  const searchTerm = (resolvedParams?.q || '').toLowerCase();

  const allDoctors = getAllDoctors();

  const filteredDoctors = allDoctors.filter((doc) => {
    const matchesSpecialty = !activeSpecialty || doc.specialty === activeSpecialty;
    const matchesSearch =
      !searchTerm ||
      doc.name.toLowerCase().includes(searchTerm) ||
      doc.specialty.toLowerCase().includes(searchTerm) ||
      doc.bio.toLowerCase().includes(searchTerm);
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Description */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
          Medical Directory
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Specialist Physicians & Attending Doctors
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Schedule private medical consultations across Addis Ababa clinics with certified specialists.
        </p>
      </div>

      {/* Specialty Filter Category Bar */}
      <SpecialtyBar activeSpecialty={activeSpecialty} />

      {/* Doctors Grid / Empty State */}
      {filteredDoctors.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
          <StethoscopeIcon className="w-12 h-12 text-teal-600 dark:text-teal-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            No doctors found matching criteria
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Try selecting &ldquo;All Specialties&rdquo; or clearing your search term to view all attending specialists.
          </p>
          <a
            href="/doctors"
            className="px-6 py-2.5 bg-teal-600 text-white text-xs font-bold rounded-xl inline-block"
          >
            Reset Filters
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} />
          ))}
        </div>
      )}

    </div>
  );
}
