"use client";
import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from "react-icons/fi";
import Image from "next/image";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];


export default function Footer() {
  const currentYear = 2026;

  return (
    <footer
      className="pt-16 pb-8 px-6"
      style={{ borderTop: "1px solid rgba(16,185,129,0.1)", background: "#06080c" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Ezra Mesele Logo"
                  width={60}
                  height={60}
                  className="w-full h-full object-contain mix-blend-screen"
                />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                Ezra<span className="text-emerald-400">.</span>
              </span>
            </a>
            <p className="text-[#94a3b8] text-sm mt-3 leading-relaxed max-w-xs">
              Building modern, high-performance web experiences with React &amp; Next.js.
            </p>
            <div className="flex gap-3 mt-5">
              {[
                { icon: FiGithub, href: "https://github.com/", label: "GitHub" },
                { icon: FiLinkedin, href: "https://linkedin.com/in/", label: "LinkedIn" },
                { icon: FiTwitter, href: "https://twitter.com/", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#94a3b8] hover:text-emerald-400 hover:border-emerald-500/40 transition-all hover:scale-110"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Navigation</h4>
            <ul className="flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[#94a3b8] text-sm hover:text-emerald-400 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Focus Areas</h4>
            <ul className="flex flex-col gap-2">
              {[
                "Front-End Web Development",
                "React & Next.js Applications",
                "Responsive Design & Mobile-First",
                "Modern Tailwind CSS & UI/UX",
                "Clean Code & Performance Optimization",
              ].map((s) => (
                <li key={s} className="text-[#94a3b8] text-sm">{s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-sm text-[#94a3b8]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p>© {currentYear} Ezra Mesele. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <FiHeart className="text-[#10b981]" size={14} /> using Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
