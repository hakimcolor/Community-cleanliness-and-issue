import React from 'react'
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
const MyIssuesDetilesCart = ({ myissusdata }) => {
  
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6 pb-10">
        {Array.isArray(myissusdata) &&
          myissusdata.map((issue) => (
            <div
              key={issue._id}
              className="rounded-xl shadow-md overflow-hidden border border-[#FFD700]/70 
                         hover:shadow-xl transition-all duration-300 flex flex-col h-full
                         bg-gradient-to-br from-[#2E8B57]/90 via-[#3CB371]/80 to-[#90EE90]/70"
            >
              {/* Image */}
              <div className="w-full aspect-[16/9] overflow-hidden">
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow text-white">
                <div className="space-y-2 flex-grow">
                  <h3 className="text-lg sm:text-xl font-semibold">
                    {issue.title}
                  </h3>
                  <p className="text-sm">
                    <span className="font-medium text-[#FFD700]">
                      Category:
                    </span>{' '}
                    {issue.category}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-[#FFD700]">
                      Location:
                    </span>{' '}
                    {issue.location}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium text-[#FFD700]">Amount:</span>{' '}
                    ${issue.amount}
                  </p>
                </div>

                {/* Button */}
                <div className="mt-auto pt-3">
                  <Link
                    to={`/issue/${issue._id}`}
                    className="flex items-center justify-center gap-2 border border-[#FFD700] bg-[#2E8B57] text-white px-4 py-2 rounded-full 
                               hover:bg-[#FFD700] hover:text-[#2E8B57] transition duration-300 font-semibold"
                  >
                    See Details <FiArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyIssuesDetilesCart
