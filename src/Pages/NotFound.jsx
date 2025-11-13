import React from 'react';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import logo from '../assets/Logo.png';
import { Helmet } from 'react-helmet';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-300 px-4 text-center">
      
      <Helmet>
        <title>404 Error| Community Cleanliness</title>
      </Helmet>
      <img
        src={logo}
        alt="Community Logo"
        className="w-32 h-32 mb-8 animate-bounce"
      />

      <img
        src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
        alt="404 Not Found"
        className="w-64 h-64 mb-6"
      />

   
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        <Typewriter
          words={[
            'Oops! Page Not Found',
            'This Issue is Missing',
            'Return to Clean Community',
          ]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </h1>

   
      <p className="text-gray-700 mb-6 max-w-xl">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable. Let’s get you back to our
        community updates!
      </p>

    
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-full shadow-lg hover:bg-green-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
