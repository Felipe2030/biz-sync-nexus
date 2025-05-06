
import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
}

const PageLayout = ({ children, title }: PageLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Header title={title} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
