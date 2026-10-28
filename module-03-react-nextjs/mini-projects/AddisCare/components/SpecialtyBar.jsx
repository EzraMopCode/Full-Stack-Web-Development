'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { SPECIALTIES } from '@/data/clinicStore';

export default function SpecialtyBar({ activeSpecialty }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (specialty) => {
    const params = new URLSearchParams(searchParams.toString());
    if (specialty === 'All Specialties') {
      params.delete('specialty');
    } else {
      params.set('specialty', specialty);
    }
    router.push(`/doctors?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {SPECIALTIES.map((spec) => {
        const isSelected = (!activeSpecialty && spec === 'All Specialties') || activeSpecialty === spec;
        return (
          <button
            key={spec}
            type="button"
            onClick={() => handleSelect(spec)}
            className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
              isSelected
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-teal-400'
            }`}
          >
            {spec}
          </button>
        );
      })}
    </div>
  );
}
