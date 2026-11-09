"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Product Manager @ TechFlow",
    text: "Ezra delivered an exceptional React dashboard that exceeded our expectations. His attention to detail, clean code, and fast turnaround made the project a huge success. I'd hire him again without hesitation.",
    initials: "SM",
    color: "from-[#7c3aed] to-[#06b6d4]",
  },
  {
    name: "James Okonkwo",
    role: "CTO @ StartupHub",
    text: "Working with Ezra was a pleasure. He rebuilt our company website using Next.js and Tailwind CSS — it's now blazing fast, beautiful, and fully accessible. His TypeScript skills are top-notch.",
    initials: "JO",
    color: "from-[#06b6d4] to-[#8b5cf6]",
  },
  {
    name: "Lena Kowalski",
    role: "Founder @ DesignStudio",
    text: "Ezra turned our Figma designs into a pixel-perfect, fully responsive website. He understood our vision immediately and delivered beyond what we expected. Highly professional and communicative.",
    initials: "LK",
    color: "from-[#f59e0b] to-[#ef4444]",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="py-28 px-6"
      style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #0d0b1a 50%, #0a0a0f 100%)" }}
      ref={ref}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Kind Words</span>
          <h2 className="section-title mt-2">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-10 md:p-14 text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" size={18} />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#cbd5e1] text-lg leading-relaxed mb-10 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              {/* Avatar */}
              <div className="flex flex-col items-center gap-3">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonials[current].color} flex items-center justify-center text-white font-bold text-lg`}
                >
                  {testimonials[current].initials}
                </div>
                <div>
                  <p className="font-bold text-base">{testimonials[current].name}</p>
                  <p className="text-[#94a3b8] text-sm">{testimonials[current].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#94a3b8] hover:text-white transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
            >
              <FiChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    background: i === current
                      ? "linear-gradient(90deg, #7c3aed, #06b6d4)"
                      : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#94a3b8] hover:text-white transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
