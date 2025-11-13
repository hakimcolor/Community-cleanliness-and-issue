import React from 'react';
import { Helmet } from 'react-helmet';

const MYContributionCArd = ({ contribution }) => {
  // যদি contribution একটা array হয় (যেমন একাধিক ডোনেশন থাকে)
  const contributions = Array.isArray(contribution)
    ? contribution
    : [contribution];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6 pb-10 px-4 sm:px-6">
   
        <title>Mycontribution | Community Cleanliness</title>

      {contributions.map((item, index) => (
        <div
          key={item._id || index}
          className="rounded-xl shadow-md overflow-hidden border border-[#FFD700]/70 
                     hover:shadow-xl transition-all duration-300 flex flex-col h-full
                     bg-gradient-to-br from-[#2E8B57]/90 via-[#3CB371]/80 to-[#90EE90]/70 text-white"
        >
          {/* Header Section */}
          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              {item.issueTitle || 'Unknown Issue'}
            </h3>
            <p className="text-sm">
              <span className="font-medium text-[#FFD700]">Contributor:</span>{' '}
              {item.contributorName || 'Anonymous'}
            </p>
            <p className="text-sm">
              <span className="font-medium text-[#FFD700]">Email:</span>{' '}
              {item.email || 'N/A'}
            </p>
            <p className="text-sm">
              <span className="font-medium text-[#FFD700]">Phone:</span>{' '}
              {item.phone || 'N/A'}
            </p>
          </div>

          {/* Amount Section */}
          <div className="px-4 py-3 mt-auto border-t border-[#FFD700]/40 bg-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-[#FFD700] font-medium">Amount:</span>
              <span className="text-lg font-semibold text-black">
                ${item.amount}
              </span>
            </div>
            <div className="text-xs text-black mt-1">
              Date: {item.date || 'N/A'}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MYContributionCArd;
