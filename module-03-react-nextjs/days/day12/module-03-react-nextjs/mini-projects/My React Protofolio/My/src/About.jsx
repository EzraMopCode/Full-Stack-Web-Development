import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal } from '@fortawesome/free-solid-svg-icons';

function About() {
  return (
    <section id="about" className="py-24 px-4 max-w-4xl mx-auto border-t border-slate-800/50">

      <div className="flex items-center gap-4 mb-10">
        <FontAwesomeIcon icon={faTerminal} className="text-orange-500 text-2xl" />
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">About Me</h2>
      </div>

      <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
        <p>
          Hello! My journey in tech started with a deep curiosity about how things work on the
          internet. Today, I'm actively pursuing my passion as a <span className="text-slate-200 font-medium font-mono">Computer Science student at
          St. Mary's University</span>.
        </p>

        <p>
          To really sharpen my practical skills, I'm also completing a supplemental full-stack program
          at <span className="text-slate-200 font-medium font-mono">IBT College</span>. This dual approach gives me a strong theoretical foundation paired with
          hands-on, modern development practices.
        </p>

        <p>
          My main focus these days is building responsive, interactive web applications. I love
          bridging the gap between design and engineering — translating beautiful mockups into
          robust, functional code.
        </p>

        {/* Styled Quote Box */}
        <div className="mt-12 p-6 bg-slate-900/50 border-l-4 border-orange-500 rounded-r-xl shadow-lg">
          <p className="text-xl text-orange-400/90 font-mono italic">
            "Always learning, always building."
          </p>
        </div>
      </div>

    </section>
  );
}

export default About;
