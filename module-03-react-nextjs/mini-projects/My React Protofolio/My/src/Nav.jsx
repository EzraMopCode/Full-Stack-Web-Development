
import customLogo from './assets/my-logo.png';

function Nav() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">


        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src={customLogo}
            alt="Ezra Logo"
            className="w-8 h-8 object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="font-mono font-bold text-xl text-slate-100 tracking-tight group-hover:text-white transition-colors">
            ezra<span className="text-orange-500">.dev</span>
          </span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#about" className="hover:text-orange-400 transition-colors">About</a>
          <a href="#skills" className="hover:text-orange-400 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-orange-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-orange-400 transition-colors">Contact</a>

          <a
            href="./Ezra Mesele Cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-orange-500/50 text-orange-500 hover:bg-orange-500/10 rounded-lg transition-colors"
          >
            Resume
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Nav;
