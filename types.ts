
export interface InterestingComponent {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  nickname: string;
  title: string;
  category: string;
  context: string;
  date: string;
  summary: string;
  details: string;
  techStack: string[];
  interestingComponents: InterestingComponent[];
  outcomes: string[];
  link?: string;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
}

export enum Page {
  Home = 'home',
  Projects = 'projects',
  Blog = 'blog',
  Contact = 'contact'
}
