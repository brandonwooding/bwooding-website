
import React from 'react';
import { Page } from '../../types';
import { SiGithub, SiLinkedin } from "react-icons/si";
import { FaFileAlt } from "react-icons/fa";
import GithubIcon from "../assets/icons/github.svg?react";
import LinkedinIcon from "../assets/icons/linkedin.svg?react";
import CvIcon from "../assets/icons/cv.svg?react";


interface HomeViewProps {
  onNavigate: (page: Page) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-6 py-20 text-center animate-in fade-in duration-1000">
      <div className="max-w-4xl w-full space-y-12">
        <div className="space-y-10">
          <h1 className="technical-mono text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-none">
            Brandon Wooding
          </h1>
          
          <div className="flex items-center justify-center gap-10">
            <IconSocialLink
              icon={<LinkedinIcon className="w-7 h-7" />}
              label="LinkedIn"
              href="https://www.linkedin.com/in/brandonwooding"
              target="_blank"
              rel="noopener noreferrer"
            />
            <IconSocialLink
              icon={<GithubIcon className="w-7 h-7" />}
              label="GitHub"
              href="https://www.github.com/brandonwooding"
              target="_blank"
              rel="noopener noreferrer"
            />
            <IconSocialLink
              icon={<CvIcon className="w-7 h7" />}
              label="CV"
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>


        </div>

        <div className="w-8 h-[1px] bg-gray-200 dark:bg-gray-800 mx-auto"></div>

        <nav className="flex flex-col items-center justify-center gap-8">
          <button
            onClick={() => onNavigate(Page.Projects)}
            className="technical-mono text-xl md:text-2xl font-light hover:text-primary lowercase tracking-tight"
          >
            projects
          </button>
          <button
            onClick={() => onNavigate(Page.Blog)}
            className="technical-mono text-xl md:text-2xl font-light hover:text-primary lowercase tracking-tight"
          >
            blog
          </button>
          <button
            onClick={() => onNavigate(Page.Contact)}
            className="technical-mono text-xl md:text-2xl font-light hover:text-primary lowercase tracking-tight"
          >
            contact
          </button>
        </nav>
      </div>
    </div>
  );
};

const IconSocialLink: React.FC<{ icon: React.ReactNode; label: string; href: string; target?: string; rel?: string }> = ({ icon, label, href, target, rel }) => (
  <a
    className="relative group flex flex-col items-center text-gray-400 hover:text-primary"
    href={href}
    target={target}
    rel={rel}
    aria-label={label}
  >
    <div className="p-2">
      {icon}
    </div>
    <span className="absolute -bottom-6 text-[9px] uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 pointer-events-none">
      {label}
    </span>
  </a>
);

export default HomeView;
