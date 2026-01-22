import React from 'react';

const ProjectsPlaceholder: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-8">
        <h2 className="text-4xl md:text-6xl technical-mono tracking-tighter lowercase">projects</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed technical-mono max-w-xl">
          a collection of things i've built.
        </p>

        <div className="pt-8">
          <p className="text-gray-400 dark:text-gray-500 technical-mono text-xs uppercase tracking-widest">
            coming soon - there's lots of cool stuff, I swear
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPlaceholder;
