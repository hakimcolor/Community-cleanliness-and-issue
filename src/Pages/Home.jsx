
import React from 'react';
import HomeSlider from '../Componentes/HomeSlider';
import { useLoaderData } from 'react-router-dom';
import ALLCARD from './ALLCARD';
import ExtraSection from './ExtraSection';
import { Typewriter } from 'react-simple-typewriter';
import { Helmet } from 'react-helmet';

const Home = () => {
  const latestdata = useLoaderData();
  console.log(latestdata);

  return (
    <div className="pt-5">
      <Helmet>
        <title>Home | Community Cleanliness</title>
      </Helmet>
      {/* 🟩 Slider Section */}
      <HomeSlider />

      {/* 🟩 Latest Posts Section */}
      <div className="mt-12 mb-10 px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            <Typewriter
              words={[
                'Latest Six Posts Here',
                'Check Out the Community Updates!',
                'Stay Tuned for New Posts!',
              ]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our newest six posts from the community.
          </p>
        </div>

        {/* 🟩 Card Section */}
        <div className="max-w-[1400px] mx-auto mt-12">
          <ALLCARD allissues={latestdata} />
          <ExtraSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
