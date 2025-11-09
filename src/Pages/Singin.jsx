import { auth } from '../Firebase/Firebase.confige';

import React, { useContext, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

const provider = new GoogleAuthProvider();

const SignIn = () => {
  const { singinuser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleToggle = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    singinuser(email, passcode)
      .then(() => {
        setEmail('');
        setPasscode('');
        toast.success('Sign in successful!', { duration: 1000 });
        navigate('/services');
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message, { duration: 2000 });
      });
  };

  const handleGoogleLogin = () => {
    setError('');

    signInWithPopup(auth, provider)
      .then(() => {
        setEmail('');
        setPasscode('');
        toast.success('Sign in successful!', { duration: 2000 });
        navigate('/services');
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message, { duration: 2000 });
      });
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.error('Please enter your email first!', { duration: 2000 });
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Password reset email sent! Check your Gmail inbox.', {
          duration: 3000,
        });
      })
      .catch((err) => {
        toast.error(err.message, { duration: 2000 });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 via-blue-50 to-blue-100 px-4">
      <Toaster />
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md relative overflow-hidden">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Sign in to continue your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type={show ? 'text' : 'password'}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10 transition duration-300"
            />
            <button
              type="button"
              onClick={handleToggle}
              className="absolute mt-6 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition duration-300"
            >
              {show ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>

          <div className="text-right mt-2">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={!email}
              className={`text-sm ${
                email
                  ? 'text-indigo-600 hover:underline'
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              Forgot Password?
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition duration-300"
        >
          <FcGoogle className="w-7 h-7" />
          <span className="font-medium text-gray-700">
            Continue with Google
          </span>
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{' '}
          <NavLink
            to="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
