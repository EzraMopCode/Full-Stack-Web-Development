import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="py-10 px-4 text-center border-t border-slate-800/50 mt-12 bg-slate-950">

      {/* Social Links Row */}
      <div className="flex justify-center gap-6 mb-6">
        <a
          href="https://github.com/EzraMopCode"
          target="_blank"
          rel="noreferrer"
          className="text-slate-500 hover:text-orange-400 hover:-translate-y-1 transition-all duration-300 p-2"
          aria-label="GitHub"
        >
          <FontAwesomeIcon icon={faGithub} className="text-2xl" />
        </a>
        <a
          href="https://www.linkedin.com/in/ezra-mesele-a7a82b426/"
          target="_blank"
          rel="noreferrer"
          className="text-slate-500 hover:text-blue-500 hover:-translate-y-1 transition-all duration-300 p-2"
          aria-label="LinkedIn"
        >
          <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
        </a>
        <a
          href="https://x.com/Ezrablockbp"
          target="_blank"
          rel="noreferrer"
          className="text-slate-500 hover:text-slate-100 hover:-translate-y-1 transition-all duration-300 p-2"
          aria-label="Twitter / X"
        >
          <FontAwesomeIcon icon={faXTwitter} className="text-2xl" />
        </a>
      </div>

      {/* Copyright Text */}
      <p className="text-slate-500 text-sm font-mono flex items-center justify-center gap-2">
        <span>© {new Date().getFullYear()} Ezra.</span>
        <span className="hidden md:inline">•</span>
        <span>Built with React & Tailwind CSS.</span>
      </p>

    </footer>
  );
}

export default Footer;
