// MainLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar style={{ flex: '0 0 250px' }} /> {/* Sidebar with fixed width */}
      <main style={{ flex: '1', padding: '20px' }}>
        <Outlet /> {/* Render the nested routes here */}
      </main>
    </div>
  );
};

export default MainLayout;
