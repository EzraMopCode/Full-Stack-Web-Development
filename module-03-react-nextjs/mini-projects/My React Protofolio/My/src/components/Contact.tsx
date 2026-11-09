"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

const info = [
  { icon: FiMail, label: "Email", value: "ezra.mesele@gmail.com", href: "mailto:ezra.mesele@gmail.com", color: "#10b981" },
  { icon: FiPhone, label: "Phone", value: "+251 912 345 678", href: "tel:+251912345678", color: "#00ff87" },
  { icon: FiMapPin, label: "Location", value: "Addis Ababa, Ethiopia", href: "#", color: "#14b8a6" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1800);
  };

  const field = (name: keyof typeof form, label: string, type = "text", placeholder = "") => (
    <div>
      <label className="text-sm font-medium text-[#94a3b8] mb-1 block">{label}</label>
      <input
        type={type}
        value={form[name]}
        onChange={(e) => setForm({ ...form, [name]: e.target.value })}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${errors[name] ? "#ef4444" : "rgba(255,255,255,0.08)"}`,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#10b981")}
        onBlur={(e) => (e.currentTarget.style.borderColor = errors[name] ? "#ef4444" : "rgba(255,255,255,0.08)")}
      />
      {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <section id="contact" className="py-28 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title mt-2">
            Contact <span className="gradient-text">Me</span>
          </h2>
          <p className="text-[#94a3b8] mt-4 max-w-xl mx-auto">
            Have a project in mind or want to work together? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6 justify-start pt-2"
          >
            <h3 className="text-xl font-bold mb-2">Let&apos;s Talk</h3>
            <p className="text-[#94a3b8] leading-relaxed mb-4">
              I&apos;m currently available for freelance projects and full-time opportunities.
              Whether you have a question, want to collaborate, or just want to say hi — my inbox is always open.
            </p>
            {info.map(({ icon: Icon, label, value, href, color }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 glass-card rounded-2xl p-5 hover:scale-[1.02] transition-transform"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${color}22`, border: `1px solid ${color}44` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <div>
                  <p className="text-xs text-[#94a3b8] mb-0.5">{label}</p>
                  <p className="font-medium text-sm">{value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card rounded-3xl p-12 h-full flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="text-5xl">🎉</div>
                <h3 className="text-xl font-bold gradient-text">Message Sent!</h3>
                <p className="text-[#94a3b8]">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => setStatus("idle")} className="btn-outline text-sm mt-4">
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-3xl p-8 flex flex-col gap-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  {field("name", "Your Name", "text", "Ezra Mesele")}
                  {field("email", "Email Address", "email", "you@example.com")}
                </div>
                {field("subject", "Subject", "text", "Project Discussion")}
                <div>
                  <label className="text-sm font-medium text-[#94a3b8] mb-1 block">Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all resize-none"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: `1px solid ${errors.message ? "#ef4444" : "rgba(255,255,255,0.08)"}`,
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#10b981")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = errors.message ? "#ef4444" : "rgba(255,255,255,0.08)")}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary justify-center disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      <FiSend size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
