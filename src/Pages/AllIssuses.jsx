import React from 'react';
import { useLoaderData } from 'react-router';
import ALLCARD from './ALLCARD';

const AllIssues = () => {
  const allissue = useLoaderData();
  console.log(allissue);

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">All Issues</h2>

      <ALLCARD allissues={allissue} />
    </div>
  );
};

export default AllIssues;
