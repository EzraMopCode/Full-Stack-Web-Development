const projects = [
  {
    name: 'Addis Eats',
    description:
      'A beautiful, interactive frontend web application built to help locals and tourists discover the best culinary spots in town.',
    tags: ['React', 'Tailwind CSS', 'Frontend UI'],
    link: 'https://github.com/yourusername/addis-eats',
  },
  {
    name: 'TaskFlow Pro',
    description:
      'A state-heavy task management dashboard focused on drag-and-drop interactions and smooth animations.',
    tags: ['React', 'Zustand', 'Framer Motion'],
    link: 'https://github.com/yourusername/taskflow-pro',
  },
  {
    name: 'WeatherDash',
    description:
      'A clean, minimalist weather dashboard fetching real-time data with a focus on mobile-first responsive design.',
    tags: ['JavaScript', 'REST APIs', 'CSS Grid'],
    link: 'https://github.com/yourusername/weatherdash',
  },
];

function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Things I&apos;ve Built</h2>
      <div className="projects-grid">
        {projects.map((project) => (
          <a key={project.name} href={project.link} className="project-card" target="_blank" rel="noreferrer">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Projects;
