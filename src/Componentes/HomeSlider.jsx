import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TipsSlider = () => {
  const tips = [
    {
      id: 1,
      title: 'Proper Waste Disposal',
      details:
        'Encourage residents to dispose of waste in designated bins. Proper segregation of biodegradable and non-biodegradable waste keeps the environment cleaner.',
      image: 'https://i.ibb.co/XWZWRN6/clean-street-waste-disposal.jpg',
    },
    {
      id: 2,
      title: 'Avoid Littering Public Areas',
      details:
        'Place enough dustbins in parks, bus stops, and marketplaces to discourage littering. Keeping shared spaces clean promotes community pride.',
      image: 'https://i.ibb.co/WBpsXkP/no-littering-public-area.jpg',
    },
    {
      id: 3,
      title: 'Organize Community Clean-Up Drives',
      details:
        'Host regular neighborhood clean-up events to involve residents and build awareness about hygiene and waste management.',
      image: 'https://i.ibb.co/bvdtFQK/community-cleanup-drive.jpg',
    },
    {
      id: 4,
      title: 'Report Garbage Collection Issues',
      details:
        'Create a simple reporting system for uncollected garbage or overflowing bins. Prompt reporting ensures quicker response from municipal authorities.',
      image: 'https://i.ibb.co/7gb3fTt/report-garbage-issues.jpg',
    },
    {
      id: 5,
      title: 'Promote Recycling & Composting',
      details:
        'Encourage recycling plastic, glass, and paper, and start composting organic waste at home or in community compost bins.',
      image: 'https://i.ibb.co/yPyZZT6/recycling-and-composting.jpg',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto my-12 px-4 shadow-2xl">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 pt-10">
        Winter Pet Care Slider
      </h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={40}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
      >
        {tips.map((tip) => (
          <SwiperSlide key={tip.id}>
            <div className="flex flex-col md:flex-row items-center border border-gray-200 rounded-3xl p-8 bg-gradient-to-r from-blue-300 via-blue-100 to-white shadow-2xl hover:shadow-3xl transition duration-500 gap-8">
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4 text-gray-900 hover:text-blue-600 transition duration-300">
                  {tip.title}
                </h3>
                <p className="text-gray-700 text-lg">{tip.details}</p>
              </div>

              <div className="flex-1 relative group">
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-72 md:h-96 object-cover rounded-2xl transform transition duration-500 group-hover:scale-105 shadow-lg"
                />

                <div className="absolute inset-0 bg-white bg-opacity-10 rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TipsSlider;
