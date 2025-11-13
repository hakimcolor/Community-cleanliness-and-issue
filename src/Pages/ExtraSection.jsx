import React from 'react';
import { Helmet } from 'react-helmet';

const ExtraSection = () => {
  return (
    <div className="mt-20 px-4 md:px-8">
    
      
      <div className="max-w-[1200px] mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
          Our Community Impact
        </h2>
        <p className="text-gray-600 mb-10">
          Together, we are making a difference in our city.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-green-50 rounded-2xl p-8 shadow hover:shadow-lg transition">
            <h3 className="text-4xl font-bold text-green-600">1,250+</h3>
            <p className="text-gray-700 mt-2">Registered Users</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-8 shadow hover:shadow-lg transition">
            <h3 className="text-4xl font-bold text-blue-600">980</h3>
            <p className="text-gray-700 mt-2">Issues Resolved</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-8 shadow hover:shadow-lg transition">
            <h3 className="text-4xl font-bold text-yellow-600">120</h3>
            <p className="text-gray-700 mt-2">Pending Issues</p>
          </div>
        </div>
      </div>

    
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl py-16 px-8 text-center text-white shadow-lg">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Join Our Clean Drive!
        </h2>
        <p className="mb-8 text-lg md:text-xl max-w-2xl mx-auto">
          Be a part of our community effort to make our city cleaner and
          greener. Volunteer today and help us create a positive impact.
        </p>
        <div className="flex justify-center">
          <button
            className="flex items-center justify-center gap-2 border border-[#FFD700]  text-white px-6 py-3 rounded-full 
                 hover:bg-[#FFD700] hover:text-[#2E8B57] transition duration-300 font-semibold cursor-pointer"
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtraSection;
