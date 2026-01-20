
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  link: string;
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
