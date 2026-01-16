import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HomeSlider = () => {
  const slides = [
    {
      _id: '1',
      title: 'Report Community Issues',
      subtitle: 'Make Your Voice Heard',
      description: 'Join thousands of community members in creating positive change. Report issues, track progress, and see real results.',
      image: 'https://i.ibb.co.com/vvkgngWM/Gemini-Generated-Image-vfnd76vfnd76vfnd.jpg',
      cta: 'Start Reporting'
    },
    {
      _id: '2',
      title: 'Community-Driven Solutions',
      subtitle: 'Together We Build Better',
      description: 'Connect with neighbors, collaborate on solutions, and build stronger communities through collective action.',
      image: 'https://i.ibb.co.com/fGTyvdTx/Gemini-Generated-Image-bqy6xjbqy6xjbqy6.jpg',
      cta: 'Join Community'
    },
    {
      _id: '3',
      title: 'Track Real Impact',
      subtitle: 'See Change Happen',
      description: 'Monitor the progress of reported issues and celebrate the positive changes happening in your neighborhood.',
      image: 'https://i.ibb.co.com/prZ7385V/Gemini-Generated-Image-qupsz6qupsz6qups.jpg',
      cta: 'View Progress'
    }
  ];

  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom'
        }}
        autoplay={{ 
          delay: 5000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="relative w-full h-full overflow-hidden">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              
              {/* Dark Overlay with Opacity */}
              <div className="absolute inset-0 bg-black opacity-60" />
              
              {/* Content */}
              <div className="relative z-10 flex items-center justify-center h-full px-4">
                <div className="text-center text-white max-w-4xl mx-auto">
                  <h3 className="text-lg md:text-xl font-medium mb-2 opacity-90">
                    {slide.subtitle}
                  </h3>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                    {slide.description}
                  </p>
                  <Link to="/allissues">
                    <button className="bg-white text-gray-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                      {slide.cta}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination Styles */}
      <style jsx>{`
        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active-custom {
          background: white;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default HomeSlider;