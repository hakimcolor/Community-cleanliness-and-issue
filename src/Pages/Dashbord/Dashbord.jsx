// Dashbord.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashbord = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loader state

  const navLinks = [
    { name: 'Add Issue 📝', path: 'addissues' },
    { name: 'My Issues 📋', path: 'myissues' },
    { name: 'My Contributions 🌟', path: 'contribution' },
  ];

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // 0.8s delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed z-20 inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-600 to-blue-500 text-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:inset-0`}
      >
        <div className="p-6 text-2xl font-bold border-b border-blue-400 flex justify-between items-center">
          Dashboard
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>
        <nav className="mt-6">
          <ul>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-6 py-3 rounded-lg mb-1 transition-all duration-200
                     hover:bg-white hover:text-blue-600 ${
                       isActive
                         ? 'bg-white text-blue-600 font-semibold shadow-md'
                         : 'text-white'
                     }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <main className="flex-1 p-6 md:ml-64 transition-all duration-300">
        {/* Top Bar */}
        <header className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded shadow animate-fadeIn">
          <div className="flex items-center gap-3 md:gap-4 flex-wrap">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition transform hover:-translate-y-1"
            >
              🔙 Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 transition transform hover:-translate-y-1"
            >
              🏠 Home
            </button>
            <button
              className="md:hidden px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
              onClick={() => setSidebarOpen(true)}
            >
              📂 Menu
            </button>
          </div>
          <h1 className="text-2xl font-bold mt-3 md:mt-0 animate-pulse text-gray-800">
            Welcome to your Dashboard ✨
          </h1>
        </header>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          // Render child routes
          <motion.div
            className="bg-white p-6 rounded shadow max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashbord;
