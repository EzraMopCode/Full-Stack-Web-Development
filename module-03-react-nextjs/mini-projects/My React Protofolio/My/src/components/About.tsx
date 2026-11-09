"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiDownload } from "react-icons/fi";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-24 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="section-label">Who I Am</span>
          <h2 className="section-title mt-2">
            About <span className="gradient-text">Me</span>
          </h2>
        </motion.div>

        {/* Clear, open text — no box / no cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Front-End Developer crafting modern, high-performance web experiences.
          </h3>

          <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-6 font-normal">
            Hi, I&apos;m <span className="text-white font-semibold">Ezra Mesele</span>. I recently completed comprehensive training across the modern front-end stack — mastering <span className="text-cyan-400 font-medium">HTML5</span>, <span className="text-cyan-400 font-medium">CSS3</span>, <span className="text-cyan-400 font-medium">JavaScript</span>, <span className="text-purple-400 font-medium">React.js</span>, and <span className="text-purple-400 font-medium">Next.js</span>.
          </p>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10">
            My focus is on translating clean UI designs into fast, responsive, and accessible web applications. I love writing maintainable code, adopting modern developer workflows, and am eager to contribute to real-world projects in an entry-level or junior role.
          </p>

          {/* Clean minimal skill pills */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-10">
            {[
              "HTML5",
              "CSS3",
              "JavaScript (ES6+)",
              "React.js",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Git & GitHub",
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-1.5 rounded-full text-sm font-medium text-white bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Action button */}
          <div>
            <a href="/resume.pdf" download className="btn-primary inline-flex text-base py-3 px-8">
              <FiDownload size={18} /> Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
