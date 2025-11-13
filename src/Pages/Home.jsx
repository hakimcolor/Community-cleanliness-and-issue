import React from 'react';
import HomeSlider from '../Componentes/HomeSlider';
import { useLoaderData } from 'react-router-dom';
import ALLCARD from './ALLCARD';

const Home = () => {
  const latestdata = useLoaderData();
  console.log(latestdata);

  return (
    <div className="pt-5">
      {/* 🟩 Slider Section */}
      <HomeSlider />

      {/* 🟩 Latest Posts Section */}
      <div className="mt-12 mb-10 px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Latest Six Posts Here
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our newest six posts from the community.
          </p>
        </div>

        {/* 🟩 Card Section */}
        <div className="max-w-[1400px] mx-auto mt-12">
          <ALLCARD allissues={latestdata} />
        </div>
      </div>
    </div>
  );
};

export default Home;
