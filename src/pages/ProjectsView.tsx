
import React, { useState } from 'react';
import { Project } from '../../types';
import projectsData from '../data/projects.json';

const PROJECTS: Project[] = (projectsData as Project[]).sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const ProjectsView: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const askMarkus = (nickname: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Give me some details on Brandon's ${nickname} project`;
    window.dispatchEvent(new CustomEvent('askMarkus', { detail: { message } }));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl technical-mono tracking-tighter lowercase mb-4">projects</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed technical-mono max-w-xl">
          A collection of cool things I've built
        </p>
      </div>

      {/* Project list */}
      <div className="space-y-6">
        {PROJECTS.map((project, index) => {
          const isExpanded = expandedId === project.id;
          return (
            <div
              key={project.id}
              className="border-2 border-black dark:border-white"
            >
              {/* Window title bar */}
              <div
                className="bg-black dark:bg-white px-3 py-1 flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(project.id)}
              >
                <span className="technical-mono text-xs text-white dark:text-black">
                  [{String(index + 1).padStart(2, '0')}] {project.nickname}.proj
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => askMarkus(project.nickname, e)}
                    className="technical-mono text-xs text-white dark:text-black flex items-center gap-1 group"
                  >
                    <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ask_markus
                    </span>
                    [?]
                  </button>
                  <span className="technical-mono text-xs text-white dark:text-black">
                    {isExpanded ? '[-]' : '[+]'}
                  </span>
                </div>
              </div>

              {/* Window content */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900">
                <div
                  className="cursor-pointer"
                  onClick={() => toggleExpand(project.id)}
                >
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3 technical-mono text-xs">
                    <span className="border border-black dark:border-white px-2 py-0.5 text-primary">
                      [{project.category.toUpperCase()}]
                    </span>
                    <span className="text-gray-500">//</span>
                    <span className="text-gray-600 dark:text-gray-400">{new Date(project.date).getFullYear()}</span>
                    <span className="text-gray-500">//</span>
                    <span className="text-gray-600 dark:text-gray-400">{project.context}</span>
                  </div>

                  {/* Title */}
                  <h3 className="technical-mono text-xl md:text-2xl mb-3 text-gray-800 dark:text-gray-200">
                    &gt; {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="technical-mono text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {project.summary}
                  </p>

                  {project.link && (
                    <a
                      href={project.link}
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      className="technical-mono text-xs text-primary hover:underline mt-3 inline-block"
                    >
                      [OPEN_LINK]
                    </a>
                  )}
                </div>

                {/* Expanded content */}
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[2000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                  <div className="border-t-2 border-dashed border-gray-300 dark:border-gray-700 pt-4 space-y-6">

                    {/* Tech Stack */}
                    <div>
                      <h4 className="technical-mono text-xs text-gray-500 mb-2">├── TECH_STACK</h4>
                      <div className="flex flex-wrap gap-2 pl-4">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="technical-mono text-xs px-2 py-1 border border-black dark:border-white text-gray-700 dark:text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interesting Components */}
                    <div>
                      <h4 className="technical-mono text-xs text-gray-500 mb-2">├── COMPONENTS</h4>
                      <div className="space-y-3 pl-4">
                        {project.interestingComponents.map((component) => (
                          <div key={component.title} className="border-l-2 border-gray-300 dark:border-gray-700 pl-3">
                            <h5 className="technical-mono text-sm text-gray-800 dark:text-gray-200">
                              &gt; {component.title}
                            </h5>
                            <p className="technical-mono text-gray-500 dark:text-gray-400 text-xs mt-1 leading-relaxed">
                              {component.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Outcomes */}
                    <div>
                      <h4 className="technical-mono text-xs text-gray-500 mb-2">└── OUTCOMES</h4>
                      <ul className="pl-4 space-y-1">
                        {project.outcomes.map((outcome, idx) => (
                          <li key={idx} className="technical-mono text-gray-600 dark:text-gray-300 text-xs">
                            • {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-12 technical-mono text-xs text-gray-400 text-center">
        ─────────────────────────────────────────<br />
        [{PROJECTS.length}] projects loaded :: EOF
      </div>
    </div>
  );
};

export default ProjectsView;
