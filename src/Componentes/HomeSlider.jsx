
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TipsSlider = () => {
  const tips = [
    {
      _id: '6912c54a2520efbc3a4007a7',
      title: 'Broken Street Light',
      category: 'Broken Public Property',
      location: 'Bashabo, Dhaka',
      description: 'Street light pole damaged, causing dark area at night.',
      image:
        'https://i.ibb.co.com/vvkgngWM/Gemini-Generated-Image-vfnd76vfnd76vfnd.jpg',
      amount: 180,
      email: 'julia@mail.com',
      date: '2025-10-24',
    },
    {
      _id: '6912c54a2520efbc3a4007a6',
      title: 'Illegal Shop Setup on Footpath',
      category: 'Illegal Construction',
      location: 'Brigade Road, Bangalore',
      description: 'Vendors blocking pedestrian paths with makeshift shops.',
      image:
        'https://i.ibb.co.com/fGTyvdTx/Gemini-Generated-Image-bqy6xjbqy6xjbqy6.jpg',
      amount: 300,
      email: 'rohan@mail.com',
      date: '2025-10-23',
    },
    {
      _id: '6912c54a2520efbc3a4007ac',
      title: 'Dumped Garbage in Playground',
      category: 'Garbage',
      location: 'Bashundhara Field, Dhaka',
      description:
        'Community members dumping garbage in children’s playground.',
      image:
        'https://i.ibb.co.com/prZ7385V/Gemini-Generated-Image-qupsz6qupsz6qups.jpg',
      amount: 270,
      email: 'emma@mail.com',
      date: '2025-10-29',
    },
    {
      _id: '6912c54a2520efbc3a4007a4',
      title: 'Uncollected Waste in Residential Area',
      category: 'Garbage',
      location: 'Sector 7, Rohini, Delhi',
      description:
        'Garbage truck has not visited for over a week causing bad odor.',
      image:
        'https://i.ibb.co.com/kgJGZgw0/id-6912c54a2520efbc3a4007a4-title-Uncoll.jpg',
      amount: 100,
      email: 'bob@mail.com',
      date: '2025-10-21',
    },
    {
      _id: '6912c54a2520efbc3a4007a5',
      title: 'Unauthorized Building Extension',
      category: 'Illegal Construction',
      location: 'Gulshan 2, Dhaka',
      description: 'Resident built an extra floor without permission.',
      image:
        'https://i.ibb.co/jk1wpWqz/Gemini-Generated-Image-wugn03wugn03wugn.jpg',
      amount: 500,
      email: 'karen@mail.com',
      date: '2025-10-22',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-16 px-4 bg-gradient-to-b from-green-100 via-green-50 to-white py-5 mt-[-2px] rounded-3xl shadow-lg">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-green-700 drop-shadow-sm">
        🧹 Community Cleanup Highlights
      </h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={40}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        className="rounded-3xl"
      >
        {tips.map((tip) => (
          <SwiperSlide key={tip._id}>
            <div className="flex flex-col md:flex-row items-center border border-green-200 rounded-3xl p-8 bg-gradient-to-r from-green-50 via-white to-green-100 shadow-xl hover:shadow-green-400 transition duration-500 gap-8">
           
              <div className="flex-1 space-y-4">
                <h3 className="text-3xl font-bold text-black">{tip.title}</h3>
                <p className="text-yellow-400 text-lg">{tip.category}</p>
                <p className="text-gray-500 text-lg">{tip.description}</p>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold text-green-700">
                      📍 Location:
                    </span>{' '}
                    {tip.location}
                  </p>
                  <p>
                    <span className="font-semibold text-green-700">
                      💰 Support Needed:
                    </span>{' '}
                    ${tip.amount}
                  </p>
                  <p>
                    <span className="font-semibold text-green-700">
                      📅 Date:
                    </span>{' '}
                    {tip.date}
                  </p>
                </div>
              </div>

           
              <div className="flex-1 relative group">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-80 md:h-96 object-cover rounded-2xl transform transition duration-700 group-hover:scale-105 shadow-lg"
                />
                <div className="absolute inset-0 bg-green-200 bg-opacity-20 rounded-2xl opacity-0 group-hover:opacity-40 transition duration-500"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TipsSlider;
