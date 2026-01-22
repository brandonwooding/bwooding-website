
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import HomeView from './pages/HomeView';
import ProjectsPlaceholder from './pages/ProjectsPlaceholder';
import BlogPlaceholder from './pages/BlogPlaceholder';
import ContactView from './pages/ContactView';
import Layout from './layout/Layout';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  // Simple hash-based router
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as Page;
      if (Object.values(Page).includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage(Page.Home);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case Page.Projects:
        return <ProjectsPlaceholder />;
      case Page.Blog:
        return <BlogPlaceholder />;
      case Page.Contact:
        return <ContactView />;
      default:
        return <HomeView onNavigate={(p) => window.location.hash = p} />;
    }
  };

  return (
    <Layout currentPage={currentPage}>
      {renderContent()}
      <ChatWidget />
    </Layout>
  );
};

export default App;
