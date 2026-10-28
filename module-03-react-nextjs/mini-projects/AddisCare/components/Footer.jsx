import Link from 'next/link';
import Image from 'next/image';
import { PhoneIcon, MapPinIcon, ClockIcon, ShieldCheckIcon } from '@/components/Icons';

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-sans border-t border-slate-200 dark:border-slate-800 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Clinic Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="AddisCare Emblem"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight block">
                  AddisCare
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-teal-700 dark:text-teal-400 block">
                  Clinic Diary
                </span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              Empowering urban healthcare in Addis Ababa with seamless digital doctor appointments, verified triage queues, and secure patient medical records.
            </p>
          </div>

          {/* Emergency Hotlines */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <PhoneIcon className="w-3.5 h-3.5 text-teal-600" />
              Emergency Hotlines
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-slate-600 dark:text-slate-400 block text-[11px]">Ambulance & Trauma:</span>
                <a href="tel:907" className="text-teal-700 dark:text-teal-400 hover:underline font-mono font-bold text-sm">
                  907 (Addis Ababa Red Cross)
                </a>
              </li>
              <li>
                <span className="text-slate-600 dark:text-slate-400 block text-[11px]">City Emergency Service:</span>
                <a href="tel:911" className="text-teal-700 dark:text-teal-400 hover:underline font-mono font-bold text-sm">
                  911 (Toll Free)
                </a>
              </li>
              <li>
                <span className="text-slate-600 dark:text-slate-400 block text-[11px]">Clinic Direct Desk:</span>
                <a href="tel:+251116123456" className="text-teal-700 dark:text-teal-400 hover:underline font-mono font-bold">
                  +251 11 612 3456
                </a>
              </li>
            </ul>
          </div>

          {/* Clinic Locations */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPinIcon className="w-3.5 h-3.5 text-teal-600" />
              Addis Ababa Branches
            </h4>
            <ul className="space-y-2.5">
              <li>
                <strong className="text-slate-900 dark:text-slate-100 block">Bole Flagship Branch:</strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Next to Medhanealem Cathedral, Cameroon St.</p>
              </li>
              <li>
                <strong className="text-slate-900 dark:text-slate-100 block">Kazanchis Central:</strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Near ECA Compound, Menelik II Ave.</p>
              </li>
              <li>
                <strong className="text-slate-900 dark:text-slate-100 block">Sarbet Branch:</strong>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">Near Vatican Embassy, South Africa St.</p>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ClockIcon className="w-3.5 h-3.5 text-teal-600" />
              Consultation Hours
            </h4>
            <div className="space-y-1.5 text-[11px]">
              <p className="flex justify-between py-0.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Mon – Fri:</span>
                <span className="text-slate-900 dark:text-white font-mono font-semibold">08:00 AM – 08:00 PM</span>
              </p>
              <p className="flex justify-between py-0.5 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-600 dark:text-slate-400">Saturday:</span>
                <span className="text-slate-900 dark:text-white font-mono font-semibold">08:30 AM – 04:00 PM</span>
              </p>
              <p className="flex justify-between py-0.5">
                <span className="text-slate-600 dark:text-slate-400">Sunday (Urgent Care):</span>
                <span className="text-teal-700 dark:text-teal-400 font-mono font-bold">09:00 AM – 02:00 PM</span>
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            © {new Date().getFullYear()} AddisCare Clinic Diary. All rights reserved.
          </p>
          <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-medium">
            <ShieldCheckIcon className="w-4 h-4 text-teal-600 flex-shrink-0" />
            <span>Regulated by Ethiopian Food and Drug Authority (EFDA) & Ministry of Health.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
