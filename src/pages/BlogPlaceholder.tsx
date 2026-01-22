import React from 'react';

const BlogPlaceholder: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-8">
        <h2 className="text-4xl md:text-6xl technical-mono tracking-tighter lowercase">writing</h2>
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed technical-mono max-w-xl">
          thoughts on AI, agents, and the future of building things.
        </p>

        <div className="pt-8">
          <p className="text-gray-400 dark:text-gray-500 technical-mono text-xs uppercase tracking-widest">
            coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogPlaceholder;
