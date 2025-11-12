import React from 'react';
import { useLoaderData } from 'react-router';
import ALLCARD from './ALLCARD';

const MyIssues = () => {
  const myissusdata = useLoaderData();
  console.log('lskdksldkkkkkkkk', myissusdata);

  // যদি একটাই issue হয়, তাহলে তাকে array বানিয়ে পাঠাই
  const allIssuesArray = Array.isArray(myissusdata)
    ? myissusdata
    : [myissusdata];

  return (
    <div>
      <ALLCARD allissues={allIssuesArray} />
    </div>
  );
};

export default MyIssues;
