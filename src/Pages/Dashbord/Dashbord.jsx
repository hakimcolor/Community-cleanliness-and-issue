// Dashbord.jsx
import React, { useState, useEffect, useContext } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FiPlus, FiList, FiHeart, FiMenu, FiX, FiHome, FiArrowLeft, FiEye, FiSun, FiMoon } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { AuthContext } from '../../Context/AuthContext';

const Dashbord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [routeLoading, setRouteLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // Apply theme using the same method as Header component
  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Handle route loading
  useEffect(() => {
    setRouteLoading(true);
    const timer = setTimeout(() => {
      setRouteLoading(false);
    }, 800); // Show loading for 800ms on route change

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const navLinks = [
    { 
      name: 'Add Issue', 
      path: 'addissues', 
      icon: <FiPlus size={20} />,
      description: 'Report a new community issue',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      name: 'My Issues', 
      path: 'myissues', 
      icon: <FiList size={20} />,
      description: 'View and manage your reports',
      color: 'from-green-500 to-green-600'
    },
    { 
      name: 'My Contributions', 
      path: 'contribution', 
      icon: <FiHeart size={20} />,
      description: 'Track your community contributions',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      name: 'All Issues', 
      path: '/allissues', 
      icon: <FiEye size={20} />,
      description: 'Browse all community issues',
      color: 'from-orange-500 to-orange-600'
    },
  ];

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-color)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed z-20 inset-y-0 left-0 w-64 shadow-xl transform transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0 md:flex-shrink-0`}
        style={{ backgroundColor: 'var(--bg-color)' }}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <MdDashboard size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-color)' }}>
                  Dashboard
                </h2>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Manage activities
                </p>
              </div>
            </div>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX size={18} style={{ color: 'var(--text-color)' }} />
            </button>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <img
              src={user?.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'}
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-blue-500"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate text-sm" style={{ color: 'var(--text-color)' }}>
                {user?.displayName || 'User'}
              </h3>
              <p className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navLinks.map((link) => (
            <div key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
                style={({ isActive }) => ({
                  color: isActive ? 'white' : 'var(--text-color)'
                })}
              >
                {({ isActive }) => (
                  <>
                    <div className={`p-2 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-white/20' : `bg-gradient-to-r ${link.color}`
                    }`}>
                      <span style={{ color: 'white' }}>
                        {link.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm">
                        {link.name}
                      </h4>
                      <p className="text-xs opacity-75 truncate">
                        {link.description}
                      </p>
                    </div>
                  </>
                )}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="p-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-3 text-white">
            <h4 className="font-semibold mb-2 text-sm">Quick Stats</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Total Issues:</span>
                <span className="font-bold">--</span>
              </div>
              <div className="flex justify-between">
                <span>Contributions:</span>
                <span className="font-bold">--</span>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-blue-500 dark:to-purple-600 rounded-lg">
                {darkMode ? (
                  <FiMoon size={16} className="text-white" />
                ) : (
                  <FiSun size={16} className="text-white" />
                )}
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-sm" style={{ color: 'var(--text-color)' }}>
                  {darkMode ? 'Dark Mode' : 'Light Mode'}
                </h4>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Switch theme
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className={`w-10 h-6 rounded-full p-1 transition-all duration-300 ${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-all duration-300 transform ${
                  darkMode ? 'translate-x-4' : 'translate-x-0'
                }`}></div>
              </div>
            </div>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-0 transition-all duration-300 flex flex-col h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="flex-shrink-0 px-4 py-3 border-b-2 border-gray-200 dark:border-gray-700 backdrop-blur-sm" style={{ backgroundColor: 'var(--bg-color)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                className="md:hidden p-2 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                onClick={() => setSidebarOpen(true)}
              >
                <FiMenu size={18} />
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm cursor-pointer"
                style={{ cursor: 'pointer' }}
              >
                <FiArrowLeft size={14} />
                Back
              </button>
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 px-3 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 text-sm cursor-pointer"
                style={{ cursor: 'pointer' }}
              >
                <FiHome size={14} />
                Home
              </button>
            </div>
            <div className="text-right">
              <h1 className="text-xl sm:text-2xl font-bold mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back! 👋
              </h1>
              <p className="text-sm sm:text-base font-medium" style={{ color: 'var(--text-secondary)' }}>
                Manage your community activities
              </p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-3 md:p-4 lg:p-6 overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <MdDashboard size={20} className="text-blue-600" />
                </div>
              </div>
              <p className="mt-3 text-lg font-medium" style={{ color: 'var(--text-color)' }}>
                Loading Dashboard...
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Please wait while we prepare your workspace
              </p>
            </div>
          ) : routeLoading ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-purple-600 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p className="mt-4 text-xl font-semibold" style={{ color: 'var(--text-color)' }}>
                Loading Page...
              </p>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                {location.pathname.includes('addissues') && 'Preparing Add Issue form...'}
                {location.pathname.includes('myissues') && 'Loading your issues...'}
                {location.pathname.includes('contribution') && 'Loading your contributions...'}
                {location.pathname.includes('allissues') && 'Loading all community issues...'}
                {!location.pathname.includes('addissues') && 
                 !location.pathname.includes('myissues') && 
                 !location.pathname.includes('contribution') && 
                 !location.pathname.includes('allissues') && 'Loading content...'}
              </p>
              <div className="mt-6 flex space-x-1">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <Outlet />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashbord;
