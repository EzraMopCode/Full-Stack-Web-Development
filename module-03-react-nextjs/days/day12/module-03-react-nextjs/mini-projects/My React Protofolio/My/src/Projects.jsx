import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const projects = [
  {
    name: 'Addis Eats',
    description: 'A comprehensive food delivery frontend with client-side routing. Features an app-like mobile UX, instant cart updates using Zustand, and dynamic Next.js layout strategies.',
    tags: ['React', 'Next.js', 'Zustand', 'Tailwind'],
    link: 'https://full-stack-web-development-nqat.vercel.app/',
    status: 'completed'
  },
  {
    name: 'Campus Space Booker',
    description: 'A facility booking interface built with a high-tech terminal aesthetic. Features complex UI state machines for managing room availability and seamless booking view transitions.',
    tags: ['React', 'Tailwind CSS', 'UI State'],
    link: 'https://github.com/EzraMopCode/campus-space-booker',
    status: 'ongoing'
  },
  {
    name: 'Clinical Diary',
    description: 'A dedicated health tracking and logging application. Focused on clean data entry forms, responsive dashboard layouts, and highly accessible user interface components.',
    tags: ['React', 'JavaScript', 'Tailwind CSS'],
    link: 'https://github.com/EzraMopCode/clinical-diary',
    status: 'ongoing'
  },
];

function Projects() {
  return (
    <section id="projects" className="py-24 px-4 max-w-6xl mx-auto border-t border-slate-800/50">

      {/* Section Header */}
      <div className="flex items-center gap-4 mb-12">
        <FontAwesomeIcon icon={faFolderOpen} className="text-orange-500 text-2xl" />
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Things I've Built</h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <a
            key={project.name}
            href={project.link}
            className="flex flex-col bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:-translate-y-2 hover:border-orange-500/50 hover:bg-slate-900/80 transition-all duration-300 group"
            target="_blank"
            rel="noreferrer"
          >
            {/* Card Top: Icons */}
            <div className="flex justify-between items-center mb-6">
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="text-4xl text-slate-700 group-hover:text-orange-500/80 transition-colors duration-300"
              />
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="text-xl text-slate-500 group-hover:text-orange-400 transition-colors duration-300"
              />
            </div>

            {/* Card Middle: Title & Badge */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-xl font-bold text-slate-100 group-hover:text-orange-400 transition-colors duration-300">
                {project.name}
              </h3>
              {project.status === 'ongoing' && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md border border-yellow-500/20 whitespace-nowrap mt-1">
                  In Progress
                </span>
              )}
            </div>

            {/* Card Middle: Description */}
            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
              {project.description}
            </p>

            {/* Card Bottom: Tech Tags */}
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-orange-400 bg-orange-400/10 px-3 py-1 rounded-full border border-orange-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>

    </section>
  );
}

export default Projects;
