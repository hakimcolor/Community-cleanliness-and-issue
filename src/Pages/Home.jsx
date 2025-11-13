
// import React from 'react';
// import HomeSlider from '../Componentes/HomeSlider';
// import { useLoaderData } from 'react-router-dom';
// import ALLCARD from './ALLCARD';
// import ExtraSection from './ExtraSection';
// import { Typewriter } from 'react-simple-typewriter';
// import { Helmet } from 'react-helmet';

// const Home = () => {
//   const latestdata = useLoaderData();
//   console.log(latestdata);

//   return (
//     <div className="pt-20">
    
//         <title>Home | Community Cleanliness</title>
    
//       {/* 🟩 Slider Section */}
//       <HomeSlider />

//       {/* 🟩 Latest Posts Section */}
//       <div className="mt-12 mb-10 px-4">
//         <div className="text-center">
//           <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
//             <Typewriter
//               words={[
//                 'Latest Six Posts Here',
//                 'Check Out the Community Updates!',
//                 'Stay Tuned for New Posts!',
//               ]}
//               loop={true}
//               cursor
//               cursorStyle="_"
//               typeSpeed={70}
//               deleteSpeed={50}
//               delaySpeed={1500}
//             />
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Stay updated with our newest six posts from the community.
//           </p>
//         </div>

//         {/* 🟩 Card Section */}
//         <div className="max-w-[1400px] mx-auto mt-12">
//           <ALLCARD allissues={latestdata} />
//           <ExtraSection />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
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

  // 4 category cards data
  const categories = [
    { title: 'Garbage', icon: '🗑️', bgColor: 'bg-green-500' },
    { title: 'Illegal Construction', icon: '🏗️', bgColor: 'bg-blue-500' },
    { title: 'Broken Public Property', icon: '🚧', bgColor: 'bg-yellow-500' },
    { title: 'Road Damage', icon: '🛣️', bgColor: 'bg-red-500' },
  ];

  return (
    <div className="pt-20">
      <Helmet>
        <title>Home | Community Cleanliness</title>
      </Helmet>

      {/* 🟩 Slider Section */}
      <HomeSlider />

      {/* 🟩 Category Section */}
      <div className="mt-12 px-4 max-w-[1200px] mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-6 rounded-lg text-white ${cat.bgColor} shadow-lg hover:scale-105 transition-transform duration-300`}
            >
              <span className="text-4xl mb-3">{cat.icon}</span>
              <h3 className="text-xl font-semibold">{cat.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* 🟩 Latest Posts Section */}
      <div className="mt-16 mb-10 px-4">
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
