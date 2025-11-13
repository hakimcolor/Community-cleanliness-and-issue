import React from 'react';
import HomeSlider from '../Componentes/HomeSlider';
import { useLoaderData } from 'react-router-dom';
import ALLCARD from './ALLCARD';

const Home = () => {
  const latestdata = useLoaderData();
  console.log(latestdata);

  return (
    <div className="pt-5">
      <HomeSlider />

      <div className=" mt-12 mb-10">
        <div className='text-center'><h1 className="text-3xl md:text-4xl font-extrabold mb-3">
          Latest Six Posts Here
        </h1></div>
        
        
        <div className="max-w-[1400px] mx-auto px-4  mt-20">
         
</div>
          <ALLCARD allissues={latestdata} />
        </div>
      </div>
    
  );
};

export default Home;
