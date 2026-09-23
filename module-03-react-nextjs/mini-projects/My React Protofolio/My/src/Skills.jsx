const skills = [
  { name: 'React.js', icon: '</>' },
  { name: 'JavaScript (ES6+)', icon: '▦' },
  { name: 'State Management', icon: '🗄' },
  { name: 'Frontend UI Design', icon: '📱' },
  { name: 'Tailwind CSS', icon: '</>' },
  { name: 'HTML5 & CSS3', icon: '▦' },
  { name: 'Git & GitHub', icon: '🔀' },
  { name: 'Responsive Design', icon: '📱' },
];

function Skills() {
  return (
    <section id="skills" className="section">
      <h2 className="section-title">My Toolkit</h2>
      <div className="toolkit-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="toolkit-card">
            <span className="toolkit-icon">{skill.icon}</span>
            <span className="toolkit-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
