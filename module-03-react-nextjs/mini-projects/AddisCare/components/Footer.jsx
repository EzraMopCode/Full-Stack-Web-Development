import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 font-sans border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* Clinic Branding */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 p-0.5">
                <Image
                  src="/logo.png"
                  alt="AddisCare Emblem"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">AddisCare</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering urban healthcare in Addis Ababa with seamless digital doctor appointments, verified triage queues, and secure patient medical records.
            </p>
          </div>

          {/* Emergency Hotlines */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Emergency Hotlines
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-500 block">Ambulance & Trauma:</span>
                <a href="tel:907" className="text-teal-400 hover:underline font-mono font-bold">
                  907 (Addis Ababa Red Cross)
                </a>
              </li>
              <li>
                <span className="text-slate-500 block">National Emergency:</span>
                <a href="tel:911" className="text-teal-400 hover:underline font-mono font-bold">
                  911 (City Emergency Service)
                </a>
              </li>
              <li>
                <span className="text-slate-500 block">Clinic Direct Desk:</span>
                <a href="tel:+251116123456" className="text-teal-400 hover:underline font-mono font-bold">
                  +251 11 612 3456
                </a>
              </li>
            </ul>
          </div>

          {/* Clinic Locations */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Addis Ababa Branches
            </h4>
            <ul className="space-y-2">
              <li>
                <strong className="text-slate-300">Bole Branch:</strong>
                <p className="text-[11px] text-slate-500">Next to Medhanealem Cathedral, Cameroon St.</p>
              </li>
              <li>
                <strong className="text-slate-300">Kazanchis Main:</strong>
                <p className="text-[11px] text-slate-500">Near ECA Compound, Menelik II Ave.</p>
              </li>
              <li>
                <strong className="text-slate-300">Sarbet Branch:</strong>
                <p className="text-[11px] text-slate-500">Near Vatican Embassy, South Africa St.</p>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Consultation Hours
            </h4>
            <div className="space-y-1 text-[11px]">
              <p className="flex justify-between">
                <span>Mon – Fri:</span>
                <span className="text-white font-mono">08:00 AM – 08:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Saturday:</span>
                <span className="text-white font-mono">08:30 AM – 04:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday (Urgent Care):</span>
                <span className="text-teal-400 font-mono">09:00 AM – 02:00 PM</span>
              </p>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} AddisCare Clinic Diary. All rights reserved.</p>
          <p className="text-slate-500">
            Regulated by Ethiopian Food and Drug Authority (EFDA) & Ministry of Health.
          </p>
        </div>
      </div>
    </footer>
  );
}
