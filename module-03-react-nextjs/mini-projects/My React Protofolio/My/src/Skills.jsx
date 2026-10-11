import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Solid icons for concepts
import {
  faLayerGroup,
  faMobileScreen,
  faWind,
  faDesktop,
  faWrench,
  faCertificate,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
// Brand icons for specific technologies
import {
  faReact,
  faJs,
  faHtml5,
  faGithub
} from '@fortawesome/free-brands-svg-icons';

const skills = [
  { name: 'React.js', icon: faReact, color: 'text-blue-400' },
  { name: 'JavaScript (ES6+)', icon: faJs, color: 'text-yellow-400' },
  { name: 'State Management', icon: faLayerGroup, color: 'text-purple-400' },
  { name: 'Frontend UI Design', icon: faMobileScreen, color: 'text-pink-400' },
  { name: 'Tailwind CSS', icon: faWind, color: 'text-teal-400' },
  { name: 'HTML5 & CSS3', icon: faHtml5, color: 'text-orange-500' },
  { name: 'Git & GitHub', icon: faGithub, color: 'text-slate-200' },
  { name: 'Responsive Design', icon: faDesktop, color: 'text-indigo-400' },
];

function Skills() {
  return (
    <section id="skills" className="py-24 px-4 max-w-5xl mx-auto border-t border-slate-800/50">

      {/* Toolkit Header */}
      <div className="flex items-center gap-4 mb-10">
        <FontAwesomeIcon icon={faWrench} className="text-orange-500 text-2xl" />
        <h2 className="text-3xl md:text-4xl font-bold text-slate-100">My Toolkit</h2>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-orange-500/50 hover:bg-slate-800/50 transition-all duration-300 group cursor-default"
          >
            <FontAwesomeIcon
              icon={skill.icon}
              className={`text-4xl mb-4 ${skill.color} group-hover:scale-110 transition-transform duration-300`}
            />
            <span className="text-slate-300 font-medium text-sm text-center">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      {/* Certifications Section */}
      <div className="flex items-center gap-4 mb-8">
        <FontAwesomeIcon icon={faCertificate} className="text-yellow-500 text-2xl" />
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Certifications</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Meta Certification */}
        <div className="flex items-start gap-4 p-6 bg-slate-900/30 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-colors">
          <FontAwesomeIcon icon={faCheckCircle} className="text-blue-500 text-xl mt-1" />
          <div>
            <h4 className="text-slate-100 font-bold text-lg mb-1">Introduction to Front-End Development</h4>
            <p className="text-slate-400 font-mono text-sm">Meta (Coursera)</p>
          </div>
        </div>

        {/* freeCodeCamp Certification */}
        <div className="flex items-start gap-4 p-6 bg-slate-900/30 rounded-xl border border-slate-800 hover:border-green-500/30 transition-colors">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-xl mt-1" />
          <div>
            <h4 className="text-slate-100 font-bold text-lg mb-1">Responsive Web Design</h4>
            <p className="text-slate-400 font-mono text-sm">freeCodeCamp</p>
          </div>
        </div>
      </div>

    </section>
  );
}

export default Skills;
