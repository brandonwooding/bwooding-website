
import React, { useState } from 'react';
import { Project } from '../../types';
import projectsData from '../data/projects.json';

const PROJECTS: Project[] = (projectsData as Project[]).sort(
  (a, b) => parseInt(b.year) - parseInt(a.year)
);

const ProjectsView: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter lowercase mb-4">selected projects</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl">
          A collection of digital products, experiments, and technical explorations.
          Focusing on performance, utility, and minimalist aesthetics.
        </p>
      </div>

      <div className="space-y-12">
        {PROJECTS.map((project) => {
          const isExpanded = expandedId === project.id;
          return (
            <div
              key={project.id}
              className="block py-12 border-b border-gray-100 dark:border-white/5 last:border-0"
            >
              <div
                className="flex flex-col md:flex-row md:items-end justify-between gap-6 cursor-pointer group"
                onClick={() => toggleExpand(project.id)}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="technical-mono text-[10px] uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded">
                      {project.category}
                    </span>
                    <span className="technical-mono text-[10px] text-gray-400">{project.year}</span>
                    <span className="technical-mono text-[10px] text-gray-400">{project.context}</span>
                  </div>
                  <h3 className="text-3xl font-normal group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
                    {project.summary}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  {project.link && (
                    <a
                      href={project.link}
                      onClick={(e: React.MouseEvent) => e.stopPropagation()}
                      className="technical-mono text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-primary hover:translate-x-1 transition-all"
                    >
                      View Project ↗
                    </a>
                  )}
                  <span className={`technical-mono text-xs text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </div>
              </div>

              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-8 pl-0 md:pl-4 border-l-0 md:border-l border-gray-100 dark:border-white/10">
                  <div className="pl-0 md:pl-6">
                    <h4 className="technical-mono text-[10px] uppercase tracking-widest text-gray-400 mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="text-xs px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pl-0 md:pl-6">
                    <h4 className="technical-mono text-[10px] uppercase tracking-widest text-gray-400 mb-3">Interesting Components</h4>
                    <div className="space-y-4">
                      {project.interestingComponents.map((component) => (
                        <div key={component.title}>
                          <h5 className="text-sm font-medium text-gray-800 dark:text-gray-200">{component.title}</h5>
                          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{component.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pl-0 md:pl-6">
                    <h4 className="technical-mono text-[10px] uppercase tracking-widest text-gray-400 mb-3">Outcomes</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {project.outcomes.map((outcome, idx) => (
                        <li key={idx} className="text-gray-600 dark:text-gray-300 text-sm">{outcome}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsView;
