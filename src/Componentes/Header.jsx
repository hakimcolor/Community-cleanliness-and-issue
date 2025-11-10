import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/Logo.png';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';

const Header = () => {
  const { user, singout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Issues', path: '/allissues' },
    { name: 'Add Issues', path: '/addissues' },
    {
      name: 'My Issues',
      path: '/myissues',
    },
    {
      name: 'My Contribution, ',
      path: '/contribution',
    },
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
    <header className="w-full fixed top-0 left-0 bg-[#2E8B57] shadow-md z-50 animate__animated animate__fadeInDown animate__faster">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <NavLink
          to="/"
          className="flex items-center gap-2 animate__animated animate__slideInDown"
        >
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 rounded-full animate__animated animate__bounceIn"
          />
          <span className="hidden sm:flex text-2xl font-bold">
            <span className="text-red-500">C</span>
            <span className="text-orange-500">C</span>
            <span className="text-yellow-400">I</span>
            <span className="text-green-300">R</span>
            <span className="text-blue-200 ">P</span>
          </span>
        </NavLink>

        <div className="md:hidden">
          {user && (
            <div className="relative group">
              <img
                src={
                  user.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'
                }
                alt="User"
                className="w-14 h-14 rounded-full border-2 border-[#FFD700] cursor-pointer"
              />
              <span
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2
                bg-[#FFD700] text-[#2E8B57] text-sm font-medium 
                px-2 py-1 rounded opacity-0 group-hover:opacity-100 
                transition-opacity duration-200 whitespace-nowrap"
              >
                {user.displayName || 'Anonymous'}
              </span>
            </div>
          )}
        </div>

        <nav className="hidden md:flex space-x-6">
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
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="relative group">
                <img
                  src={
                    user.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'
                  }
                  alt="User"
                  className="w-14 h-14 rounded-full border-2 border-[#FFD700] cursor-pointer"
                />
                <span
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2
                  bg-[#FFD700] text-[#2E8B57] text-sm font-medium 
                  px-2 py-1 rounded opacity-0 group-hover:opacity-100 
                  transition-opacity duration-200 whitespace-nowrap"
                >
                  {user.displayName || 'Anonymous'}
                </span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="border border-[#FFD700] text-white px-4 py-1 rounded-full hover:bg-[#FFD700] hover:text-[#2E8B57] transition duration-300 flex items-center gap-2 font-semibold  "
              >
                <FiLogOut size={18} />
                Log Out
              </button>
            </div>
          ) : (
            <NavLink to="/signup">
              <button className="border border-[#FFD700] text-white px-4 py-1 rounded-full hover:bg-[#FFD700] hover:text-[#2E8B57] transition duration-300">
                Sign Up
              </button>
            </NavLink>
          )}
        </div>

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

            {user ? (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="border border-[#FFD700] text-white px-4 py-1 rounded-full hover:bg-[#FFD700] hover:text-[#2E8B57] transition duration-300"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                <button className="border border-[#FFD700] text-white px-4 py-1 rounded-full hover:bg-[#FFD700] hover:text-[#2E8B57] transition duration-300">
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
