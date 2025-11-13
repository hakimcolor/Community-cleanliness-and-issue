// import React from 'react';
// import { useLoaderData } from 'react-router-dom';
// import MYContributionCArd from './MYContributionCArd.jsx';


// const MyContribution = () => {
//   const contribution = useLoaderData();
//   console.log(contribution);

//   return (
//     <div className="mt-20 px-4 sm:px-6">
//       <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
//         All My Contributions
//       </h1>
//       <MYContributionCArd contribution={contribution} />
//     </div>
//   );
// };

// export default MyContribution;
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import MYContributionCArd from './MYContributionCArd.jsx';
import { AuthContext } from '../Context/AuthContext';
import { Helmet } from 'react-helmet';

const MyContribution = () => {
  const contribution = useLoaderData(); // সব কনট্রিবিউশন
  const { user } = useContext(AuthContext); // লগইন ইউজার

  // শুধু লগইন করা ইউজারের কনট্রিবিউশন ফিল্টার করা
  const myContributions = contribution.filter(
    (item) => item.email === user?.email
  );

  return (
    <div className="mt-20 px-4 sm:px-6">
      <Helmet>
        <title>Mycontribuition | Community Cleanliness</title>
      </Helmet>
      <h1 className="text-2xl font-bold text-center">
        All My Contributions
      </h1>

      {myContributions.length > 0 ? (
        <MYContributionCArd contribution={myContributions} />
      ) : (
        <p className="text-center text-gray-500">
          You have no contributions yet.
        </p>
      )}
    </div>
  );
};

export default MyContribution;
