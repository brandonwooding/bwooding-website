
import React from 'react';
import { Page } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage }) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-primary selection:text-white">
      {/* Conditionally render header if not home */}
      {currentPage !== Page.Home && (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 py-4 px-6">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <a href="#" className="technical-mono font-bold text-sm uppercase tracking-tighter">
              B. Wooding
            </a>
            <nav className="flex gap-6 text-xs uppercase tracking-widest font-bold text-gray-400">
              <a href="#projects" className={`hover:text-primary transition-colors ${currentPage === Page.Projects ? 'text-primary' : ''}`}>Projects</a>
              <a href="#blog" className={`hover:text-primary transition-colors ${currentPage === Page.Blog ? 'text-primary' : ''}`}>Blog</a>
              <a href="#contact" className={`hover:text-primary transition-colors ${currentPage === Page.Contact ? 'text-primary' : ''}`}>Contact</a>
            </nav>
          </div>
        </header>
      )}

      <main className={`flex-grow ${currentPage !== Page.Home ? 'pt-24' : ''}`}>
        {children}
      </main>

      <footer className="w-full py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-4">
          <p className="text-[10px] text-gray-400 dark:text-gray-600 technical-mono tracking-[0.2em] uppercase">
            BRANDON WOODING | London, UK
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
