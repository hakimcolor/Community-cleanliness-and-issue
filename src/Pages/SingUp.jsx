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
import { Helmet } from 'react-helmet';

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
      toast.error('Please accept our terms and conditions.');
      return;
    }
    if (passwordValue.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    if (!/[A-Z]/.test(passwordValue)) {
      toast.error('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/[0-9]/.test(passwordValue)) {
      toast.error('Password must include at least one number.');
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
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
        toast.error(err.message);
      });
  };

  const handleGoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success('Google Sign Up successful!');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-100 via-green-50 to-green-200 px-4 relative pt-20 pb-10">
      <Helmet>
        <title>Singup | Community Cleanliness</title>
      </Helmet>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="bg-[#2E8B57] shadow-2xl rounded-3xl p-10 w-full max-w-md border border-[#FFD700]">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="text-white mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white text-[#2E8B57] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD700] focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Profile Image URL</label>
            <input
              type="text"
              name="imgUrl"
              placeholder="Enter image URL"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white text-[#2E8B57] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD700] focus:outline-none transition"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white text-[#2E8B57] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD700] focus:outline-none transition"
            />
          </div>

          <div className="relative flex flex-col">
            <label className="text-white mb-2">Password</label>
            <input
              type={show ? 'text' : 'password'}
              name="password"
              placeholder="Enter your password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white text-[#2E8B57] border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FFD700] focus:outline-none pr-12 transition"
            />
            <button
              type="button"
              onClick={handleToggle}
              className="absolute mt-14 right-4 -translate-y-1/2 text-[#2E8B57] hover:text-[#FFD700]"
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
            <label htmlFor="terms" className="text-white text-sm">
              Accept our{' '}
              <span className="text-[#FFD700]">terms and conditions</span>
            </label>
          </div>

          {error && <p className="text-red-300 text-sm">{error}</p>}
          {success && (
            <p className="text-green-300 text-sm">Registration successful!</p>
          )}

          {/* Unified button style */}
          <button
            type="submit"
            className="w-full py-3 border border-[#FFD700] bg-transparent text-white font-bold rounded-xl hover:bg-[#FFD700] hover:text-[#2E8B57] transition duration-300 cursor-pointer"
          >
            Sign Up
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-[#FFD700]"></div>
          <span className="px-3 text-[#FFD700] text-sm">or</span>
          <div className="flex-grow h-px bg-[#FFD700]"></div>
        </div>

        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-3 border border-[#FFD700] py-3 rounded-xl text-white hover:bg-[#FFD700] hover:text-[#2E8B57] transition duration-300"
        >
          <FcGoogle className="w-7 h-7" />
          <span className="font-medium cursor-pointer">Continue with Google</span>
        </button>

        <p className="text-sm text-center text-white mt-6">
          Already have an account?{' '}
          <NavLink to="/signin" className="text-[#FFD700] hover:underline">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
