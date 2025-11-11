// // IssueDetails.jsx
// import React from 'react';
// import { useLoaderData } from 'react-router-dom';

// const IssueDetails = () => {
//   const issue = useLoaderData(); // loader থেকে আসা data
// console.log(issue);

//   return (
//     <div className="max-w-3xl mx-auto p-6 mt-10">
//       <h1 className="text-2xl font-bold mb-4">{issue.title}</h1>
//       <img
//         src={issue.image}
//         alt={issue.title}
//         className="w-full h-64 object-cover mb-4"
//       />
//       <p>
//         <strong>Category:</strong> {issue.category}
//       </p>
//       <p>
//         <strong>Location:</strong> {issue.location}
//       </p>
//       <p>
//         <strong>Amount:</strong> ${issue.amount}
//       </p>
//       <p className="mt-4">{issue.description}</p>
//     </div>
//   );
// };

// export default IssueDetails;
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Calendar, MapPin, Tag, DollarSign } from 'lucide-react';

const IssueDetails = () => {
  const issue = useLoaderData();

  if (!issue) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <p>Loading issue details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-5 mt-14  px-6">
      <div className="flex items-center justify-center text-4xl font-bold text-center mb-10 text-gray-900 ">
        your card details!
      </div>

      <div className="max-w-xl md:max-w-3xl xl:max-w-5xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-yellow-200 dark:border-gray-700">
        {/* Image */}
        <div className="relative">
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
              {issue.title}
            </h1>
          </div>
        </div>

        {/* Details */}
        <div className="p-8 text-gray-800 dark:text-gray-200 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Tag className="text-yellow-500" size={18} />
              <span>
                <strong className="text-[#FFD700]">Category:</strong>{' '}
                {issue.category}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="text-green-500" size={18} />
              <span>
                <strong className="text-[#FFD700]">Location:</strong>{' '}
                {issue.location}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="text-blue-500" size={18} />
              <span>
                <strong className="text-[#FFD700]">Date:</strong>{' '}
                {issue.date || 'Not specified'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="text-red-500" size={18} />
              <span>
                <strong className="text-[#FFD700]">Suggested Budget:</strong> $
                {issue.amount}
              </span>
            </div>
          </div>

          <hr className="border-t border-yellow-200 dark:border-gray-700" />

          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Description
            </h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              {issue.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
