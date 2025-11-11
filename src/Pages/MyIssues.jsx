import React from 'react'
import { useLoaderData } from 'react-router'
import MyIssuesDetilesCart from './MyIssuesDetilesCart';

const MyIssues = () => {
  const myissusdata = useLoaderData();
  return (
    <div>
      <MyIssuesDetilesCart myissusdata={myissusdata} />
    </div>
  );
}

export default MyIssues
