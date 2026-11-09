"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>

      <motion.div
        className="fixed top-0 left-0 h-[3px] z-[9999] origin-left"
        style={{
          background: "linear-gradient(90deg, #00ff87, #10b981)",
          scaleX: 0,
        }}
        id="scroll-progress"
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
          scrolled
            ? "glass-card py-3 shadow-lg shadow-black/40 border-b border-emerald-500/10"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          <a
            href="#home"
            className="flex items-center gap-3 group"
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Ezra Mesele Logo"
                width={120}
                height={120}
                className="w-full h-full object-contain mix-blend-screen group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Ezra<span className="text-emerald-400">.</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 relative group ${
                    active === link.href.replace("#", "")
                      ? "text-[#34d399]"
                      : "text-[#94a3b8] hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full transition-all duration-300 ${
                      active === link.href.replace("#", "")
                        ? "w-full bg-gradient-to-r from-[#00ff87] to-[#10b981]"
                        : "w-0 bg-gradient-to-r from-[#00ff87] to-[#10b981] group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden md:inline-flex btn-primary text-sm py-2 px-5"
            >
              Hire Me
            </a>
            <button
              className="md:hidden text-white text-2xl hover:text-emerald-400 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[998] flex flex-col items-center justify-center"
            style={{ background: "rgba(7,9,14,0.98)", backdropFilter: "blur(20px)" }}
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary">
                  Hire Me
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
