
import React, { useContext } from 'react';
import HomeSlider from '../Componentes/HomeSlider';
import { useLoaderData, Link } from 'react-router-dom';
import ALLCARD from './ALLCARD';
import ExtraSection from './ExtraSection';
import { Typewriter } from 'react-simple-typewriter';
import { Helmet } from 'react-helmet';
import FAQsection from './FAQsection';
import SlideOnScroll from './SlideOnScroll';
import { AuthContext } from '../Context/AuthContext';
import { FiArrowDown, FiUsers, FiTrendingUp, FiAward, FiCheckCircle, FiStar, FiMail } from 'react-icons/fi';
import { MdRecycling, MdLocationCity, MdTrendingUp } from 'react-icons/md';

const Home = () => {
  const latestdata = useLoaderData();
  const { user } = useContext(AuthContext);

  // Statistics data
  const stats = [
    { icon: <FiUsers size={40} />, number: '15,000+', label: 'Active Users' },
    { icon: <MdRecycling size={40} />, number: '2,500+', label: 'Issues Resolved' },
    { icon: <MdLocationCity size={40} />, number: '50+', label: 'Cities Covered' },
    { icon: <FiAward size={40} />, number: '98%', label: 'Success Rate' }
  ];

  // Features data
  const features = [
    {
      icon: <FiCheckCircle size={30} />,
      title: 'Easy Reporting',
      description: 'Report community issues with just a few clicks'
    },
    {
      icon: <FiUsers size={30} />,
      title: 'Community Driven',
      description: 'Connect with neighbors to solve problems together'
    },
    {
      icon: <FiTrendingUp size={30} />,
      title: 'Track Progress',
      description: 'Monitor the status of reported issues in real-time'
    },
    {
      icon: <FiAward size={30} />,
      title: 'Recognition System',
      description: 'Get recognized for your contributions to the community'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Community Leader',
      image: 'https://i.ibb.co/2Z3p8wN/default-user.png',
      text: 'This platform has transformed how our community addresses local issues. Highly recommended!'
    },
    {
      name: 'Mike Chen',
      role: 'Local Resident',
      image: 'https://i.ibb.co/2Z3p8wN/default-user.png',
      text: 'Finally, a way to make our voices heard and see real change in our neighborhood.'
    },
    {
      name: 'Emma Davis',
      role: 'Environmental Activist',
      image: 'https://i.ibb.co/2Z3p8wN/default-user.png',
      text: 'The impact tracking feature helps us measure our environmental improvements.'
    }
  ];

  const categories = [
    { title: 'Garbage', icon: '🗑️', bgColor: 'bg-green-500', count: '450+' },
    { title: 'Illegal Construction', icon: '🏗️', bgColor: 'bg-blue-500', count: '230+' },
    { title: 'Broken Public Property', icon: '🚧', bgColor: 'bg-yellow-500', count: '180+' },
    { title: 'Road Damage', icon: '🛣️', bgColor: 'bg-red-500', count: '320+' },
  ];

  return (
    <div className="pt-12">
      <Helmet>
        <title>Home | Community Cleanliness & Issue Reporting Platform</title>
        <meta name="description" content="Join our community-driven platform to report and resolve local issues. Make your neighborhood cleaner and safer." />
      </Helmet>

      {/* 1. Hero Section with Carousel - Full screen height */}
      <section className="relative h-screen overflow-hidden">
        <HomeSlider />
        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <FiArrowDown size={32} className="text-white drop-shadow-lg" />
        </div>
      </section>

      {/* 2. Welcome/Introduction Section */}
      <section className="py-8 md:py-16" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center border border-gray-200 dark:border-gray-700 sm:border-2 lg:border-4 rounded-lg sm:rounded-xl lg:rounded-2xl py-6 md:py-8 lg:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ color: 'var(--text-color)' }}>
            <Typewriter
              words={[
                'Welcome to Community Care',
                'Report Issues, Create Change',
                'Building Better Communities Together'
              ]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>
          <p className="text-lg sm:text-xl md:text-xl max-w-3xl mx-auto leading-relaxed mb-6 md:mb-8 px-2" style={{ color: 'var(--text-secondary)' }}>
            Join thousands of community members working together to identify, report, and resolve local issues. 
            From cleanliness concerns to infrastructure problems, your voice matters in creating positive change.
          </p>
          {!user && (
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/allissues">
                <button className="w-full sm:w-auto bg-blue-600 text-white px-6 md:px-8 py-3 rounded-full hover:bg-blue-700 transition text-base md:text-lg font-semibold">
                  Get Started
                </button>
              </Link>
              <Link to="/about">
                <button className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 px-6 md:px-8 py-3 rounded-full hover:bg-blue-600 hover:text-white transition text-base md:text-lg font-semibold">
                  Learn More
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 3. Statistics Section */}
      <section className="py-8 md:py-16" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideOnScroll>
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-8 md:mb-12" style={{ color: 'var(--text-color)' }}>
              Our Impact in Numbers
            </h2>
          </SlideOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <SlideOnScroll key={index}>
                <div className="text-center p-4 md:p-6 rounded-lg bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border border-gray-200 dark:border-gray-600">
                  <div className="text-blue-600 dark:text-blue-400 mb-3 md:mb-4 flex justify-center transform transition-transform duration-300 hover:scale-125">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1 md:mb-2 transform transition-all duration-300 hover:scale-105">
                    {stat.number}
                  </h3>
                  <p className="font-medium text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </p>
                </div>
              </SlideOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Categories Section */}
      <section className="py-8 md:py-16" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideOnScroll>
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-8 md:mb-12" style={{ color: 'var(--text-color)' }}>
              Issue Categories
            </h2>
          </SlideOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat, index) => (
              <SlideOnScroll key={index}>
                <div className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-xl text-white ${cat.bgColor} shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-3 cursor-pointer h-40 md:h-48 w-full`}>
                  <span className="text-3xl md:text-4xl mb-2 md:mb-3 transform transition-transform duration-300 hover:scale-125 hover:rotate-12">{cat.icon}</span>
                  <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2 text-center">{cat.title}</h3>
                  <p className="text-xs md:text-sm opacity-90 text-center">{cat.count} reported</p>
                </div>
              </SlideOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Features Section */}
      <section className="py-8 md:py-16" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideOnScroll>
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-8 md:mb-12" style={{ color: 'var(--text-color)' }}>
              Why Choose Our Platform?
            </h2>
          </SlideOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {features.map((feature, index) => (
              <SlideOnScroll key={index}>
                <div className="text-center p-4 md:p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 h-48 md:h-56 w-full flex flex-col justify-center" 
                     style={{ backgroundColor: 'var(--bg-color)' }}>
                  <div className="text-blue-600 dark:text-blue-400 mb-3 md:mb-4 flex justify-center transform transition-transform duration-300 hover:scale-125 hover:rotate-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 transform transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400" style={{ color: 'var(--text-color)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-xs md:text-sm leading-relaxed px-2" style={{ color: 'var(--text-secondary)' }}>
                    {feature.description}
                  </p>
                </div>
              </SlideOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Latest Issues Section */}
      <section className="py-8 md:py-16" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <SlideOnScroll>
              <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4 md:mb-6" style={{ color: 'var(--text-color)' }}>
                Latest Community Reports
              </h2>
              <p className="text-lg sm:text-xl md:text-xl max-w-2xl mx-auto px-2" style={{ color: 'var(--text-secondary)' }}>
                Stay updated with the newest reports from community members across different areas.
              </p>
            </SlideOnScroll>
          </div>
          <SlideOnScroll>
            <ALLCARD allissues={latestdata} />
          </SlideOnScroll>
          
          {/* View All Issues Button */}
          <SlideOnScroll>
            <div className="text-center mt-8 md:mt-12">
              <Link to="/allissues">
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 transition-all duration-300">
                  View All Issues
                </button>
              </Link>
            </div>
          </SlideOnScroll>
        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="py-8 md:py-16" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideOnScroll>
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold text-center mb-8 md:mb-12" style={{ color: 'var(--text-color)' }}>
              What Our Community Says
            </h2>
          </SlideOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <SlideOnScroll key={index}>
                <div className="p-4 md:p-6 rounded-lg bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border border-gray-200 dark:border-gray-600 h-72 md:h-80 flex flex-col justify-between">
                  <div className="flex justify-center mb-3 md:mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} size={14} className="md:w-4 md:h-4 text-yellow-400 fill-current transform transition-transform duration-300 hover:scale-125" />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full flex-shrink-0 transform transition-transform duration-300 hover:scale-110"
                    />
                    <div>
                      <h4 className="font-semibold text-base md:text-lg mb-1 text-gray-800 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-300">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="italic text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-200">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              </SlideOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Call to Action Section */}
      <section className="py-8 md:py-16" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-2 border-gray-200 dark:border-gray-700 rounded-lg py-6 md:py-8">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4 md:mb-6" style={{ color: 'var(--text-color)' }}>
            Ready to Make a Difference?
          </h2>
          <p className="text-lg sm:text-xl md:text-xl mb-6 md:mb-8 px-2" style={{ color: 'var(--text-secondary)' }}>
            Join our growing community of changemakers and help build a better tomorrow, one report at a time.
          </p>
          {user ? (
            <Link to="/addissues">
              <button className="w-full sm:w-auto bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-blue-700 transition text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1">
                Report an Issue Now
              </button>
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <button className="w-full sm:w-auto bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-blue-700 transition text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1">
                  Sign Up Today
                </button>
              </Link>
              <Link to="/about">
                <button className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-blue-600 hover:text-white transition text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1">
                  Learn More
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 9. Newsletter Section */}
      <section className="py-8 md:py-16" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-2 border-gray-200 dark:border-gray-700 rounded-lg py-6 md:py-8">
          <SlideOnScroll>
            <FiMail size={40} className="md:w-12 md:h-12 text-blue-600 mx-auto mb-4 md:mb-6 transform transition-transform duration-300 hover:scale-125 hover:rotate-12" />
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold mb-3 md:mb-4" style={{ color: 'var(--text-color)' }}>
              Stay Updated
            </h2>
            <p className="text-base sm:text-lg md:text-lg mb-6 md:mb-8 px-2" style={{ color: 'var(--text-secondary)' }}>
              Subscribe to our newsletter for community updates, success stories, and platform news.
            </p>
          </SlideOnScroll>
          <SlideOnScroll>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
              />
              <button className="w-full sm:w-auto bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 text-sm md:text-base">
                Subscribe
              </button>
            </div>
          </SlideOnScroll>
        </div>
      </section>

      {/* 10. Extra Section */}
      <SlideOnScroll>
        <ExtraSection />
      </SlideOnScroll>

      {/* 11. FAQ Section */}
      <SlideOnScroll>
        <FAQsection />
      </SlideOnScroll>
    </div>
  );
};

export default Home;
