import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import {
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.confige';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';

const provider = new GoogleAuthProvider();

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [firstName, setFirstName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleToggle = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const terms = e.target.terms.checked;
    const firstNameValue = firstName.trim();
    const imgUrlValue = imgUrl.trim();
    const emailValue = email.trim();
    const passwordValue = passcode.trim();

    if (!terms) {
      setError('Please accept our terms and conditions.');
      toast.error('Please accept our terms and conditions.');
      return;
    }
    if (passwordValue.length < 6) {
      setError('Password must be at least 6 characters long.');
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    if (!/[A-Z]/.test(passwordValue)) {
      setError('Password must contain at least one uppercase letter.');
      toast.error('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/[0-9]/.test(passwordValue)) {
      setError('Password must include at least one number.');
      toast.error('Password must include at least one number.');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
      setError(
        'Password must include at least one special character (e.g., # or % ).'
      );
      toast.error(
        'Password must include at least one special character (e.g., # or % ).'
      );
      return;
    }

    createUser(emailValue, passwordValue, firstNameValue, imgUrlValue)
      .then((res) => {
        return updateProfile(res.user, {
          displayName: firstNameValue,
          photoURL: imgUrlValue,
        }).then(() => {
          e.target.reset();
          setEmail('');
          setPasscode('');
          setFirstName('');
          setImgUrl('');
          setSuccess(true);
          toast.success('Registration successful!');
          navigate('/');
        });
      })
      .catch((err) => {
        setError(err.message);
        toast.error(err.message);
      });
  };

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setEmail('');
        setPasscode('');
        setSuccess(true);
        toast.success('Google Sign Up successful!', result.user);
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 via-blue-50 to-blue-100  px-4 relative pt-20 pb-10">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-[#3b2f2f] shadow-2xl rounded-3xl p-10 w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-200 mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 mb-2">Profile Image URL</label>
            <input
              type="text"
              name="imgUrl"
              placeholder="Enter image URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-200 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          <div className="relative flex flex-col">
            <label className="text-gray-200 mb-2">Password</label>
            <input
              type={show ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-12 transition"
            />
            <button
              type="button"
              onClick={handleToggle}
              className="absolute mt-14 right-4 -translate-y-1/2 text-gray-300 hover:text-white"
            >
              {show ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms" className="text-gray-300 text-sm">
              Accept our{' '}
              <span className="text-cyan-500">terms and conditions</span>
            </label>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm">Registration successful!</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-500"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-500"></div>
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 border border-gray-600 py-3 rounded-xl hover:bg-gray-600 transition duration-300"
        >
          <FcGoogle className="w-7 h-7" />
          <span className="font-medium text-white">Continue with Google</span>
        </button>

        <p className="text-sm text-center text-gray-300 mt-6">
          Already have an account?{' '}
          <NavLink to="/signin" className="text-indigo-500 hover:underline">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
