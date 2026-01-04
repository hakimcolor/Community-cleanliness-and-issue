// import React from 'react';
// import { NavLink, useLoaderData } from 'react-router-dom';
// import { Calendar, MapPin, Tag, DollarSign } from 'lucide-react';
// import { Helmet } from 'react-helmet';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const IssueDetails = () => {
//   const issue = useLoaderData();

//   if (!issue) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-600">
//         <p>Loading issue details...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-5 mt-14 px-6">
//       <title>IssueDetails| Community Cleanliness</title>

//       <div className="flex items-center justify-center  text-3xl md:text-4xl font-extrabold mb-6 text-blue-600 dark:text-blue-400 text-center">
//         your card details!
//       </div>

//       <div className="max-w-xl md:max-w-3xl xl:max-w-5xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-yellow-200 dark:border-gray-700">
//         <div className="relative">
//           <img
//             src={issue.image}
//             alt={issue.title}
//             className="w-full h-[500px] object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
//             <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
//               {issue.title}
//             </h1>
//           </div>
//         </div>

//         <div className="p-8 text-gray-800 dark:text-gray-200 space-y-5">
//           <div className="grid sm:grid-cols-2 gap-4">
//             <div className="flex items-center gap-2 text-sm">
//               <Tag className="text-yellow-500" size={18} />
//               <span>
//                 <strong className="text-[#FFD700]">Category:</strong>{' '}
//                 {issue.category}
//               </span>
//             </div>

//             <div className="flex items-center gap-2 text-sm">
//               <MapPin className="text-green-500" size={18} />
//               <span>
//                 <strong className="text-[#FFD700]">Location:</strong>{' '}
//                 {issue.location}
//               </span>
//             </div>

//             <div className="flex items-center gap-2 text-sm">
//               <Calendar className="text-blue-500" size={18} />
//               <span>
//                 <strong className="text-[#FFD700]">Date:</strong>{' '}
//                 {issue.date || 'Not specified'}
//               </span>
//             </div>

//             <div className="flex items-center gap-2 text-sm">
//               <DollarSign className="text-red-500" size={18} />
//               <span>
//                 <strong className="text-[#FFD700]">Suggested Budget:</strong> $
//                 {issue.amount}
//               </span>
//             </div>
//           </div>

//           <hr className="border-t border-yellow-200 dark:border-gray-700" />

//           <div>
//             <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
//               Description
//             </h2>
//             <p className="leading-relaxed text-gray-700 dark:text-gray-300">
//               {issue.description}
//             </p>
//           </div>

//           <NavLink to={`/contributionss/${issue._id}`}>
//             <div className="pt-6 flex justify-center">
//               <button
//                 className="border border-[#FFD700] text-white px-4 py-1 rounded-full hover:bg-[#FFD700] hover:text-[#2E8B57] transition duration-300 cursor-pointer text-2xl font-bold"
//                 onClick={() =>
//                   toast.success('Thank you for your contribution!', {
//                     position: 'top-right',
//                     autoClose: 3000,
//                   })
//                 }
//               >
//                 💰 Contribute Now
//               </button>
//             </div>
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IssueDetails;
import React from 'react';
import { NavLink, useLoaderData, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Tag, DollarSign, ArrowLeft } from 'lucide-react'; 
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loding';

const IssueDetails = () => {
  const issue = useLoaderData();
  const navigate = useNavigate(); 

  if (!issue) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
  <Loading/>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-5 mt-14 px-6">
      <title>IssueDetails| Community Cleanliness</title>

      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:underline cursor-pointer border-2 border-red-300 p-2 rounded-full"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      <div className="flex items-center justify-center  text-3xl md:text-4xl font-extrabold mb-6 text-blue-600 dark:text-blue-400 text-center">
        Your card details!
      </div>

      <div className="max-w-xl md:max-w-3xl xl:max-w-5xl mx-auto  bg-gradient-to-br from-[#2E8B57]/90 via-[#3CB371]/80 to-[#90EE90]/70 backdrop-blur-xl shadow-xl rounded-2xl overflow-hidden border border-yellow-200 dark:border-gray-700">
        <div className="relative">
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <h1 className="text-3xl sm:text-4xl font-bold  text-blue-500 drop-shadow-lg">
              {issue.title}
            </h1>
          </div>
        </div>

        <div className="p-8 text-gray-800 dark:text-gray-200 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Tag className="text-yellow-500" size={18} />
              <span className="text-[18px]">
                <strong className="text-[#FFD700]">Category:</strong>{' '}
                {issue.category}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="" size={18} />
              <span className="text-[18px]">
                <strong className="text-[#ffd900]">Location:</strong>{' '}
                {issue.location}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="text-blue-900" size={18} />
              <span className="text-[18px]">
                <strong className="text-[#FFD700]">Date:</strong>{' '}
                {issue.date || 'Not specified'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="text-red-500" size={18} />
              <span className="text-[18px]">
                <strong className="text-[#FFD700]">Suggested Budget:</strong> $
                {issue.amount}
              </span>
            </div>
          </div>

          <hr className="border-t border-yellow-200 dark:border-gray-700" />

          <div>
            <h2 className="text-2xl font-semibold mb-2 text-blue-900 font-bold">
              Description
            </h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-900">
              {issue.description}
            </p>
          </div>

          <NavLink to={`/contributionss/${issue._id}`}>
            <div className="pt-6 flex justify-center">
              <button
                className="border border-[#FFD700] text-white px-4 py-1 rounded-full hover:bg-[#FFD700] hover:text-[#2E8B57] transition duration-300 cursor-pointer text-2xl font-bold"
                onClick={() =>
                  toast.success('Thank you for your contribution!', {
                    position: 'top-right',
                    autoClose: 3000,
                  })
                }
              >
                💰 Contribute Now
              </button>
            </div>
          </NavLink>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default IssueDetails;
