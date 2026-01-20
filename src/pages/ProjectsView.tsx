
import React from 'react';
import { Project } from '../../types';

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Linear Mobile Redesign',
    category: 'Product Design',
    year: '2024',
    description: 'Conceptualizing a faster way to manage issues on the go.',
    link: '#'
  },
  {
    id: '2',
    title: 'Vercel Analytics Dashboard',
    category: 'Engineering',
    year: '2023',
    description: 'Real-time performance metrics for high-traffic applications.',
    link: '#'
  },
  {
    id: '3',
    title: 'Open Source UI Library',
    category: 'Frontend',
    year: '2023',
    description: 'A set of accessible, headless components for React.',
    link: '#'
  }
];

const ProjectsView: React.FC = () => {
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
        {PROJECTS.map((project) => (
          <a 
            key={project.id} 
            href={project.link}
            className="group block py-12 border-b border-gray-100 dark:border-white/5 last:border-0"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="technical-mono text-[10px] uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded">
                    {project.category}
                  </span>
                  <span className="technical-mono text-[10px] text-gray-400">{project.year}</span>
                </div>
                <h3 className="text-3xl font-normal group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
                  {project.description}
                </p>
              </div>
              <div className="technical-mono text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:translate-x-1 transition-transform">
                View Project ↗
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;
