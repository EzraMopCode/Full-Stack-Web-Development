"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiArrowDown,
  FiDownload,
} from "react-icons/fi";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiHtml5 } from "react-icons/si";

const roles = [
  "Front-End Developer",
  "React.js Developer",
  "Next.js Developer",
  "UI/UX Enthusiast",
  "TypeScript Dev",
];

const floatingIcons = [
  { icon: SiReact, color: "#61dafb", top: "15%", left: "8%", delay: 0 },
  { icon: SiNextdotjs, color: "#fff", top: "70%", left: "5%", delay: 1 },
  { icon: SiTypescript, color: "#3178c6", top: "20%", right: "8%", delay: 0.5 },
  { icon: SiTailwindcss, color: "#38bdf8", top: "75%", right: "7%", delay: 1.5 },
  { icon: SiJavascript, color: "#f7df1e", top: "50%", left: "3%", delay: 2 },
  { icon: SiHtml5, color: "#e34f26", top: "45%", right: "3%", delay: 2.5 },
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const speed = isDeleting ? 50 : 100;

    typingRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 50%, #0d1a14 0%, #07090e 70%)" }}
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-25"
        style={{ background: "radial-gradient(circle, #10b981, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, #00ff87, transparent)" }} />

      {/* Floating tech icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl opacity-20 hidden lg:block"
          style={{ top: item.top, left: item.left, right: item.right, color: item.color }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
        >
          <item.icon />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs font-semibold tracking-[4px] uppercase text-[#34d399] mb-4 px-4 py-2 rounded-full"
            style={{ border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}>
            👋 Available for work
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight"
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text">Ezra Mesele</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-3xl font-semibold mb-6 text-[#94a3b8] min-h-[2rem]"
        >
          <span className="text-white">{displayText}</span>
          <span className="cursor-blink text-[#10b981]">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#94a3b8] text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        >
          I craft beautiful, performant web experiences using modern technologies.
          Passionate about clean code and pixel-perfect design.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <a href="#projects" className="btn-primary text-base">
            View My Work <FiArrowDown className="ml-1" />
          </a>
          <a href="/resume.pdf" download className="btn-outline text-base">
            <FiDownload /> Download CV
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex gap-5 justify-center"
        >
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
              className="w-11 h-11 rounded-full flex items-center justify-center text-[#94a3b8] hover:text-white transition-all duration-300 hover:scale-110"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
            >
              <Icon size={18} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#94a3b8] text-xs"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll Down</span>
        <FiArrowDown size={16} />
      </motion.div>
    </section>
  );
}
