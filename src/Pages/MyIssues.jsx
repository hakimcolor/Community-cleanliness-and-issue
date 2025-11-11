import React from 'react'
import { useLoaderData } from 'react-router'

const MyIssues = () => {
  const myissusdata = useLoaderData();
  return (
    <div>
      <ALLCARD myissusdata={myissusdata}></ALLCARD>
    </div>
  );
}

export default MyIssues
