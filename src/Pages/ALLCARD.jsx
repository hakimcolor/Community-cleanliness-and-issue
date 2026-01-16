import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { Helmet } from 'react-helmet';

const ALLCARD = ({ allissues}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6 pb-10">
      <title>Home | Community Cleanliness</title>
 
      {Array.isArray(allissues) &&
        allissues.map((issue) => (
          <div
            key={issue._id}
            className="rounded-xl shadow-lg hover:shadow-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-500 flex flex-col h-full transform hover:scale-105 hover:-translate-y-2"
            style={{ backgroundColor: 'var(--bg-color)' }}
          >
            {/* Image Section */}
            <div className="w-full aspect-[16/9] overflow-hidden">
              <img
                src={issue.image}
                alt={issue.title}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="space-y-3 flex-grow">
                <h3 className="text-xl font-semibold leading-tight" style={{ color: 'var(--text-color)' }}>
                  {issue.title}
                </h3>
                <div className="space-y-2">
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-medium text-blue-600 dark:text-blue-400">Category:</span>{' '}
                    {issue.category}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-medium text-green-600 dark:text-green-400">Location:</span>{' '}
                    {issue.location}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-medium text-red-600 dark:text-red-400">Amount:</span>{' '}
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">${issue.amount}</span>
                  </p>
                </div>
              </div>

              {/* Button Section */}
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  to={`/issue/${issue._id}`}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
                >
                  See Details <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ALLCARD;
