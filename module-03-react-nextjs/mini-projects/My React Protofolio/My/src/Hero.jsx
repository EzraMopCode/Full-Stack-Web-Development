import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import heroImage from './assets/my-logo.png';

function Hero() {
  return (
    <section id="hero" className="py-24 px-4 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between min-h-[85vh] gap-12">

      <div className="flex-1 flex flex-col justify-center">
        <p className="text-orange-500 font-mono mb-5 text-lg">
          Hi there, my name is
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-100 tracking-tight mb-4">
          Ezra.
        </h1>

        <h2 className="text-4xl md:text-5xl font-bold text-slate-400 mb-8 max-w-2xl">
          I build interactive things for the web.
        </h2>

        <p className="text-lg text-slate-400 max-w-xl leading-relaxed mb-10">
          I'm a Computer Science student at St. Mary's University absolutely loving building exceptional digital experiences. Currently specializing in responsive React frontends, I am actively expanding into full-stack architecture with <span className="text-blue-400 font-medium font-mono">C# & .NET backend services</span>.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            Check out my work <FontAwesomeIcon icon={faChevronRight} className="text-sm ml-1" />
          </a>

          <a
            href="#contact"
            className="px-6 py-3 bg-transparent border border-slate-700 hover:border-slate-400 text-slate-300 font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-lg mr-1" /> Get in touch
          </a>
        </div>
      </div>

      <div className="flex-1 flex justify-center md:justify-end w-full">
        <div className="relative w-64 h-64 md:w-80 md:h-80 group">
          <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-3xl group-hover:bg-orange-500/30 transition-colors duration-700"></div>
          <img
            src={heroImage}
            alt="Ezra"
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

    </section>
  );
}

export default Hero;
