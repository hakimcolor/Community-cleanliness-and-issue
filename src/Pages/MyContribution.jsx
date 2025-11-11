import React from 'react';
import { useLoaderData } from 'react-router-dom';
import MYContributionCArd from './MYContributionCArd.jsx';


const MyContribution = () => {
  const contribution = useLoaderData();
  console.log(contribution);

  return (
    <div className="mt-20 px-4 sm:px-6">
      <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
        All My Contributions
      </h1>
      <MYContributionCArd contribution={contribution} />
    </div>
  );
};

export default MyContribution;
