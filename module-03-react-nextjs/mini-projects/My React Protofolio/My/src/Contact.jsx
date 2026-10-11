import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function Contact() {
  return (
    <section id="contact" className="py-32 px-4 max-w-2xl mx-auto text-center border-t border-slate-800/50">

      {/* Subtitle / Eyebrow text */}
      <span className="text-orange-500 font-mono text-sm tracking-widest uppercase mb-4 block">
        What's Next?
      </span>

      {/* Main Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">
        Get In Touch
      </h2>

      {/* Description */}
      <p className="text-lg text-slate-400 leading-relaxed mb-10">
        I'm currently looking for new internship opportunities where I can apply my React frontend experience and continue expanding into C# / .NET architecture. My inbox is always open. Whether you have a question, a potential role, or just want to say hi, I'll try my best to get back to you!
      </p>

      {/* Call to Action Button */}
      <a
        href="mailto:your.email@example.com"
        className="inline-flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-orange-500/20"
      >
        <FontAwesomeIcon icon={faPaperPlane} className="text-lg" />
        Say Hello
      </a>

    </section>
  );
}

export default Contact;
