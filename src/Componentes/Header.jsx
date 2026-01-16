import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX, FiSun, FiMoon, FiHome, FiList, FiPlus, FiUser, FiSettings, FiChevronDown, FiInfo } from 'react-icons/fi';
import { MdDashboard, MdBugReport, MdContactSupport } from 'react-icons/md';
import logo from '../assets/Logo.png';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Header = () => {
  const { user, singout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const navLinks = user
    ? [
        { name: 'Home', path: '/', icon: <FiHome size={18} /> },
        { name: 'All Issues', path: '/allissues', icon: <FiList size={18} /> },
        { name: 'Add Issue', path: '/dashbord/addissues', icon: <FiPlus size={18} /> },
        { name: 'About', path: '/about', icon: <FiInfo size={18} /> },
        { name: 'Contact', path: '/contact', icon: <MdContactSupport size={18} /> },
        {
          name: 'Dashboard',
          path: '/dashbord',
          icon: <MdDashboard size={18} />
        },
      ]
    : [
        { name: 'Home', path: '/', icon: <FiHome size={18} /> },
        { name: 'All Issues', path: '/allissues', icon: <FiList size={18} /> },
        { name: 'About', path: '/about', icon: <FiInfo size={18} /> },
        { name: 'Contact', path: '/contact', icon: <MdContactSupport size={18} /> },
      ];

  const handleLogout = () => {
    if (!singout) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        singout()
          .then(() => {
            Swal.fire({
              title: 'Logged out!',
              text: 'You have been successfully logged out.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
            toast.success('Successfully logged out!');
            setTimeout(() => navigate('/'), 1500);
          })
          .catch((error) => {
            toast.error(`Logout error: ${error.message}`);
          });
      }
    });
  };

  return (
    <header
      className="w-full fixed top-0 left-0 shadow-md z-50 animate__animated animate__fadeInDown animate__faster"
      style={{
        backgroundColor: 'var(--header-bg)',
        color: 'var(--header-text)',
      }}
    >
      <Toaster position="top-right" />

      <div className="flex justify-between items-center px-3 sm:px-4 lg:px-6 py-3 sm:py-4 max-w-7xl mx-auto">
        <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Logo" className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full" />
          <span className="hidden sm:flex text-lg sm:text-xl lg:text-2xl font-bold">
            <span className="text-red-500">C</span>
            <span className="text-orange-500">C</span>
            <span className="text-yellow-400">I</span>
            <span className="text-green-300">R</span>
            <span className="text-blue-200">P</span>
          </span>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-3 xl:gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-1 xl:gap-2 font-medium transition-all duration-200 px-2 xl:px-3 py-1 rounded-lg text-sm xl:text-base ${
                  isActive
                    ? 'text-white bg-white/20 backdrop-blur-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <span className="flex-shrink-0">{link.icon}</span>
              <span className="whitespace-nowrap">{link.name}</span>
            </NavLink>
          ))}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-2 xl:ml-4 p-2 rounded-full border border-white/50 text-white hover:bg-white hover:text-black transition-all duration-200 flex-shrink-0"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {user ? (
            <div className="flex items-center gap-2 xl:gap-4 ml-2 xl:ml-4">
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-1 xl:gap-2 p-1 rounded-full hover:bg-white/10 transition-all duration-200"
                >
                  <img
                    src={
                      user.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'
                    }
                    alt="User"
                    className="w-8 h-8 xl:w-10 xl:h-10 rounded-full border-2 border-white"
                  />
                  <FiChevronDown size={14} className="text-white" />
                </button>
                
                {profileDropdown && (
                  <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 w-44 xl:w-48 z-50 border border-gray-200 dark:border-gray-600">
                    <NavLink
                      to="/profile"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center gap-2 px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FiUser size={16} />
                      Profile
                    </NavLink>
                    <NavLink
                      to="/dashbord"
                      onClick={() => setProfileDropdown(false)}
                      className="flex items-center gap-2 px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <MdDashboard size={16} />
                      Dashboard
                    </NavLink>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileDropdown(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 xl:px-4 py-2 text-sm xl:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FiLogOut size={16} />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <NavLink to="/signup">
              <button className="px-3 xl:px-4 py-1 xl:py-2 border border-white/50 rounded-full text-white hover:bg-white hover:text-blue-600 transition-all duration-200 text-sm xl:text-base font-medium">
                Sign Up
              </button>
            </NavLink>
          )}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-2xl text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-md shadow-2xl animate__animated animate__slideInRight z-50">
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
                <span className="text-lg font-bold text-white">Menu</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 flex flex-col py-6 px-4 space-y-2 overflow-y-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'text-white bg-white/20 backdrop-blur-sm'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  <span className="flex-shrink-0">{link.icon}</span>
                  <span className="text-base font-medium">{link.name}</span>
                </NavLink>
              ))}

              {/* Mobile Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-3 p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 mt-4"
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                <span className="text-base font-medium">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </nav>

            {/* Mobile User Section */}
            <div className="border-t border-gray-700 p-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <img
                      src={user.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'}
                      alt="User"
                      className="w-10 h-10 rounded-full border-2 border-white/50"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-white/60 text-xs truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  
                  <NavLink
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                  >
                    <FiUser size={18} />
                    <span className="text-base font-medium">Profile</span>
                  </NavLink>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 w-full p-3 rounded-lg text-white/80 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                  >
                    <FiLogOut size={18} />
                    <span className="text-base font-medium">Log Out</span>
                  </button>
                </div>
              ) : (
                <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                  <button className="w-full p-3 border border-white/50 rounded-lg text-white hover:bg-white hover:text-gray-900 transition-all duration-200 font-medium">
                    Sign Up
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
