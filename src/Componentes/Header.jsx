import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import logo from '../assets/Logo.png';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Header = () => {
  const { user, singout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
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
        { name: 'Home', path: '/' },
        { name: 'All Issues', path: '/allissues' },
        { name: 'Add Issues', path: '/addissues' },
        { name: 'My Issues', path: '/myissues' },
        { name: 'My Contribution', path: '/contribution' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'All Issues', path: '/allissues' },
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

      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-16 h-16 rounded-full" />
          <span className="hidden sm:flex text-2xl font-bold">
            <span className="text-red-500">C</span>
            <span className="text-orange-500">C</span>
            <span className="text-yellow-400">I</span>
            <span className="text-green-300">R</span>
            <span className="text-blue-200">P</span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#FFD700] underline underline-offset-4'
                    : 'text-white hover:text-[#FFD700]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 p-2 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {user ? (
            <div className="flex items-center gap-4 ml-4">
              <img
                src={
                  user.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'
                }
                alt="User"
                className="w-14 h-14 rounded-full border-2 border-[#FFD700]"
              />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-1 border border-[#FFD700] rounded-full text-white hover:bg-[#FFD700] hover:text-[#2E8B57] transition"
              >
                <FiLogOut size={18} />
                Log Out
              </button>
            </div>
          ) : (
            <NavLink to="/signup">
              <button className="px-4 py-1 border border-[#FFD700] rounded-full text-white hover:bg-[#FFD700] hover:text-[#2E8B57] transition">
                Sign Up
              </button>
            </NavLink>
          )}
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-white"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed top-24 right-0 p-10 bg-[#2E8B57] shadow-md rounded-bl-3xl animate__animated animate__slideInRight z-40">
          <nav className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-lg transition-all duration-200 ${
                    isActive
                      ? 'text-[#FFD700] underline underline-offset-4'
                      : 'text-white hover:text-[#FFD700]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mt-2 p-2 rounded-full border border-white text-white hover:bg-white hover:text-black transition"
            >
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="px-4 py-1 border border-[#FFD700] rounded-full text-white hover:bg-[#FFD700] hover:text-[#2E8B57] transition"
              >
                Log Out
              </button>
            ) : (
              <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                <button className="px-4 py-1 border border-[#FFD700] rounded-full text-white hover:bg-[#FFD700] hover:text-[#2E8B57] transition cursor-pointer">
                  Sign Up
                </button>
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
