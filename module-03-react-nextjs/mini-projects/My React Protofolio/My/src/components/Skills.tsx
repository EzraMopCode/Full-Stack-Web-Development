"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs,
  SiTypescript, SiTailwindcss, SiGit,
} from "react-icons/si";

const skills = [
  { name: "HTML5", icon: SiHtml5, color: "#e34f26", percent: 95 },
  { name: "CSS3", icon: SiCss, color: "#1572b6", percent: 90 },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e", percent: 88 },
  { name: "React.js", icon: SiReact, color: "#61dafb", percent: 85 },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", percent: 80 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6", percent: 75 },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38bdf8", percent: 85 },
  { name: "Git/GitHub", icon: SiGit, color: "#f05032", percent: 80 },
];

const techChips = [
  { name: "HTML5", icon: SiHtml5, color: "#e34f26" },
  { name: "CSS3", icon: SiCss, color: "#1572b6" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38bdf8" },
  { name: "Git", icon: SiGit, color: "#f05032" },
];

function SkillBar({ name, icon: Icon, color, percent, delay }: {
  name: string; icon: React.ComponentType<{ size?: number; color?: string }>; color: string; percent: number; delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon size={18} color={color} />
          <span className="font-medium text-sm">{name}</span>
        </div>
        <span className="text-sm font-semibold text-[#34d399]">{percent}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, #10b981, #00ff87)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      className="py-28 px-6"
      style={{ background: "linear-gradient(180deg, #07090e 0%, #0a120d 50%, #07090e 100%)" }}
      ref={ref}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label">What I Know</span>
          <h2 className="section-title mt-2">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-[#94a3b8] mt-4 max-w-xl mx-auto">
            Here&apos;s a snapshot of the technologies I work with daily.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Progress bars */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-8 text-[#94a3b8]">Proficiency</h3>
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} {...skill} delay={0.3 + i * 0.08} />
            ))}
          </motion.div>

          {/* Tech chips grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-8 text-[#94a3b8]">Tech Stack</h3>
            <div className="grid grid-cols-2 gap-4">
              {techChips.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="glass-card rounded-2xl p-5 flex flex-col items-center gap-3 cursor-default group"
                >
                  <tech.icon size={36} color={tech.color} />
                  <span className="text-sm font-semibold text-[#94a3b8] group-hover:text-white transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
