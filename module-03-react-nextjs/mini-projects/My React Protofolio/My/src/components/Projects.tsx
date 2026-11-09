"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

type Category = "all" | "react" | "nextjs" | "html-css";

const projects = [
  {
    id: 1,
    title: "Addis Eats",
    description: "A modern food discovery and online restaurant ordering platform featuring authentic cuisine menus, category filtering, cart management, and responsive UI.",
    category: "nextjs" as Category,
    tech: ["Next.js", "Tailwind CSS", "React", "Vercel"],
    gradient: "from-[#059669] to-[#047857]",
    live: "https://full-stack-web-development-2h3q.vercel.app/",
    github: "https://github.com/",
  },
  {
    id: 2,
    title: "AddisCare — Clinical Diary",
    description: "A premier medical clinic diary and doctor appointment booking platform built with Next.js, featuring patient logs, healthcare scheduling, and doctor profiles.",
    category: "nextjs" as Category,
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    gradient: "from-[#10b981] to-[#0d9488]",
    live: "https://full-stack-web-development-b37k.vercel.app/",
    github: "https://github.com/",
  },
  {
    id: 3,
    title: "BlogSpace Platform",
    description: "A modern blogging platform with MDX support, SEO optimization, and comment system.",
    category: "nextjs" as Category,
    tech: ["Next.js", "MDX", "Tailwind", "Prisma"],
    gradient: "from-[#047857] to-[#14b8a6]",
    live: "#",
    github: "#",
  },
  {
    id: 4,
    title: "Portfolio UI Kit",
    description: "A collection of reusable, animated React components for building modern portfolio websites.",
    category: "react" as Category,
    tech: ["React", "Framer Motion", "Storybook"],
    gradient: "from-[#0f766e] to-[#059669]",
    live: "#",
    github: "#",
  },
  {
    id: 5,
    title: "Agency Landing Page",
    description: "A high-converting agency landing page with parallax effects, animations, and contact form.",
    category: "html-css" as Category,
    tech: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    gradient: "from-[#10b981] to-[#06b6d4]",
    live: "#",
    github: "#",
  },
  {
    id: 6,
    title: "Task Manager App",
    description: "A drag-and-drop task manager with boards, subtasks, priority labels, and local storage.",
    category: "react" as Category,
    tech: ["React", "TypeScript", "dnd-kit", "Zustand"],
    gradient: "from-[#065f46] to-[#0f766e]",
    live: "#",
    github: "#",
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "React", value: "react" },
  { label: "Next.js", value: "nextjs" },
  { label: "HTML/CSS", value: "html-css" },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<Category>("all");

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label">My Work</span>
          <h2 className="section-title mt-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[#94a3b8] mt-4 max-w-xl mx-auto">
            A selection of projects I&apos;ve built — from web apps to UI systems.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === f.value
                  ? "text-[#03140a] font-bold shadow-lg shadow-emerald-500/25"
                  : "text-[#94a3b8] hover:text-white"
              }`}
              style={
                active === f.value
                  ? { background: "linear-gradient(135deg, #00ff87, #10b981)" }
                  : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }
              }
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                whileHover={{ y: -8 }}
                className="glass-card rounded-2xl overflow-hidden group"
              >
                {/* Gradient thumbnail */}
                <div className={`h-44 bg-gradient-to-br ${project.gradient} relative flex items-center justify-center`}>
                  <span className="text-white/20 text-6xl font-black">{project.id.toString().padStart(2, "0")}</span>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                      <FiExternalLink size={16} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                    >
                      <FiGithub size={16} />
                    </a>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-base mb-2">{project.title}</h3>
                  <p className="text-[#94a3b8] text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-md font-medium text-[#34d399]"
                        style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.2)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2 border-t border-white/5">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-xs font-bold py-2 rounded-lg text-[#03140a] transition-all"
                      style={{ background: "linear-gradient(135deg, #00ff87, #10b981)" }}
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-xs font-semibold py-2 rounded-lg text-[#94a3b8] hover:text-white transition-all flex items-center justify-center gap-1"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      <FiGithub size={12} /> GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
