import React from 'react';
import HomeSlider from '../Componentes/HomeSlider';

const Home = () => {
 


  return (
    <div className="bg-gradient-to-b from-blue-100 via-blue-50 to-white min-h-screen pt-5">
      <HomeSlider />

      <div className="text-center mt-12 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-3">
          Our Popular Services
        </h1>
        <p className="text-gray-600 text-lg">
          Here are some of our most requested pet care services this winter.
        </p>
      </div>

  
     
    </div>
  );
};

export default Home;
