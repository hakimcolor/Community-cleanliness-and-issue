
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import MYContributionCArd from './MYContributionCArd.jsx';
import { AuthContext } from '../Context/AuthContext';
import { Helmet } from 'react-helmet';

const MyContribution = () => {
  const contribution = useLoaderData(); 
  const { user } = useContext(AuthContext); 


  const myContributions = contribution.filter(
    (item) => item.email === user?.email
  );

  return (
    <div className="mt-20 px-4 sm:px-6">
      <Helmet>
        <title>Mycontribuition | Community Cleanliness</title>
      </Helmet>
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600 dark:text-blue-400">
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
