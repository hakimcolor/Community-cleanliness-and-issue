import React, { useState, useEffect } from 'react';
import Header from '../Componentes/Header';
import { Outlet, useLocation } from 'react-router';
import Footer from '../Componentes/Footer';


const Root = () => {
  const location = useLocation();
  const [routeLoading, setRouteLoading] = useState(false);

  // Handle route loading for navbar navigation
  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 1000); // Show loading for 1 second on route change

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Loading component
  const LoadingPage = () => (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-color)' }}>
        Loading Page...
      </h2>
      
      <p className="text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
        {location.pathname === '/' && 'Loading Home page...'}
        {location.pathname === '/allissues' && 'Loading All Issues...'}
        {location.pathname === '/about' && 'Loading About page...'}
        {location.pathname === '/contact' && 'Loading Contact page...'}
        {!['/', '/allissues', '/about', '/contact'].includes(location.pathname) && 'Loading content...'}
      </p>
      
      {/* Animated dots */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
      
      {/* Progress bar */}
      <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <div>
      <Header></Header>
      <br />
      <br />

      {routeLoading ? <LoadingPage /> : <Outlet></Outlet>}
      <Footer></Footer>
    </div>
  );
};

export default Root;
