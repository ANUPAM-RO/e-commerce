import React from 'react';
import { Layout as AntLayout } from 'antd';
import Navbar from './Navbar';

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntLayout className="min-h-screen">
      <Navbar />
      <Content className="p-6">
        {children}
      </Content>
    </AntLayout>
  );
}; 