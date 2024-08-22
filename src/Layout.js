// Layout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const location = useLocation();

  // Check if the current route is login or signup
  const showSidebar = !['/login', '/signup'].includes(location.pathname);

  return (
    <div>
      {showSidebar && <Sidebar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
