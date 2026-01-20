
import React from 'react';
import { Post } from '../../types';

const POSTS: Post[] = [
  {
    id: '1',
    title: 'Designing for the Technical Mind',
    date: 'March 12, 2024',
    excerpt: 'Why engineers prefer minimalist interfaces and functional typography.',
    readingTime: '5 min read'
  },
  {
    id: '2',
    title: 'Performance-First React Architectures',
    date: 'Feb 28, 2024',
    excerpt: 'Optimizing for Core Web Vitals in 2024 without sacrificing DX.',
    readingTime: '12 min read'
  },
  {
    id: '3',
    title: 'The Future of Headless CMS',
    date: 'Jan 15, 2024',
    excerpt: 'How structured data is evolving beyond standard JSON responses.',
    readingTime: '8 min read'
  }
];

const BlogView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter lowercase mb-4">writing</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl">
          Thoughts on design systems, frontend architecture, and the intersection of code and aesthetics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        {POSTS.map((post) => (
          <article key={post.id} className="group cursor-pointer">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 technical-mono text-[10px] uppercase tracking-widest text-gray-400">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-normal group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                {post.excerpt}
              </p>
              <div className="pt-2">
                <span className="text-xs font-bold technical-mono uppercase tracking-widest border-b border-gray-200 dark:border-white/10 group-hover:border-primary transition-colors">
                  Read Article
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogView;
