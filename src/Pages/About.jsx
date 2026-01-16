import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FiUsers, FiTarget, FiHeart, FiAward, FiTrendingUp, FiShield, FiArrowUp } from 'react-icons/fi';
import { MdRecycling, MdLocationCity, MdGroups } from 'react-icons/md';
import SlideOnScroll from './SlideOnScroll';

const About = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const stats = [
    { icon: <FiUsers size={40} />, number: '15,000+', label: 'Active Community Members' },
    { icon: <MdRecycling size={40} />, number: '2,500+', label: 'Issues Successfully Resolved' },
    { icon: <MdLocationCity size={40} />, number: '50+', label: 'Cities and Towns Covered' },
    { icon: <FiAward size={40} />, number: '98%', label: 'User Satisfaction Rate' }
  ];

  const values = [
    {
      icon: <FiHeart size={30} />,
      title: 'Community First',
      description: 'We believe in the power of community collaboration to create lasting positive change in neighborhoods.'
    },
    {
      icon: <FiShield size={30} />,
      title: 'Transparency',
      description: 'Every report, every action, and every outcome is tracked and visible to maintain complete transparency.'
    },
    {
      icon: <FiTarget size={30} />,
      title: 'Impact Focused',
      description: 'We measure success by the real-world improvements we help communities achieve together.'
    },
    {
      icon: <FiTrendingUp size={30} />,
      title: 'Continuous Growth',
      description: 'We constantly evolve our platform based on community feedback and emerging needs.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://i.ibb.co/2Z3p8wN/default-user.png',
      description: 'Environmental advocate with 10+ years in community development.'
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      image: 'https://i.ibb.co/2Z3p8wN/default-user.png',
      description: 'Tech innovator passionate about using technology for social good.'
    },
    {
      name: 'Emma Davis',
      role: 'Community Manager',
      image: 'https://i.ibb.co/2Z3p8wN/default-user.png',
      description: 'Community organizer dedicated to empowering local voices.'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Platform Launch', description: 'Started with 5 communities and 100 users' },
    { year: '2021', title: 'Rapid Growth', description: 'Expanded to 20 cities with 5,000+ active users' },
    { year: '2022', title: 'Major Impact', description: 'Helped resolve 1,000+ community issues' },
    { year: '2023', title: 'Recognition', description: 'Won Community Impact Award' },
    { year: '2024', title: 'Global Reach', description: 'Now serving 50+ cities worldwide' }
  ];

  return (
    <div className="pt-12">
      <Helmet>
        <title>About Us | Community Cleanliness & Issue Reporting Platform</title>
        <meta name="description" content="Learn about our mission to empower communities through collaborative issue reporting and resolution." />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About Our Mission
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            We're building a world where every community has the tools and voice to create positive change, 
            one report at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/allissues">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-gray-100 transition text-lg font-semibold">
                Join Our Community
              </button>
            </Link>
            <Link to="/allissues">
              <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition text-lg font-semibold">
                View Our Impact
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <SlideOnScroll>
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--text-color)' }}>
                  Our Story
                </h2>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  It started with a simple observation: communities have the power to solve their own problems, 
                  but they often lack the right tools and platforms to coordinate their efforts effectively.
                </p>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Founded in 2020, our platform was born from the belief that technology should serve communities, 
                  not the other way around. We've grown from a small team with a big vision to a global platform 
                  serving thousands of communities worldwide.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  Today, we're proud to be the bridge between community concerns and actionable solutions, 
                  helping neighbors connect, collaborate, and create lasting positive change.
                </p>
              </div>
            </SlideOnScroll>
            <SlideOnScroll>
              <div className="relative">
                <img
                  src="https://i.ibb.co.com/prZ7385V/Gemini-Generated-Image-qupsz6qupsz6qups.jpg"
                  alt="Community collaboration"
                  className="rounded-lg shadow-lg w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-blue-600/20 rounded-lg"></div>
              </div>
            </SlideOnScroll>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--text-color)' }}>
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <SlideOnScroll key={index}>
                <div className="text-center p-6 rounded-lg shadow-lg hover:shadow-xl transition bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600">
                  <div className="text-blue-600 dark:text-blue-400 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                    {stat.number}
                  </h3>
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </p>
                </div>
              </SlideOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--text-color)' }}>
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <SlideOnScroll key={index}>
                <div className="flex items-start space-x-4 p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="text-blue-600 dark:text-blue-400 mt-1">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-color)' }}>
                      {value.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {value.description}
                    </p>
                  </div>
                </div>
              </SlideOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <SlideOnScroll>
            <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--text-color)' }}>
              Our Journey
            </h2>
          </SlideOnScroll>
          <div className="relative">
            {/* Animated Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800 animate-pulse"></div>
            
            <div className="space-y-16">
              {milestones.map((milestone, index) => (
                <SlideOnScroll key={index}>
                  <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} group`}>
                    <div className="w-1/2 px-8">
                      <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'} transform transition-all duration-700 group-hover:scale-105`}>
                        {/* Animated Year Badge */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full inline-block text-sm font-semibold mb-4 shadow-lg transform transition-all duration-500 hover:scale-110 hover:shadow-xl animate-bounce">
                          {milestone.year}
                        </div>
                        
                        {/* Animated Title */}
                        <h3 className="text-2xl font-bold mb-3 transform transition-all duration-500 group-hover:translate-x-2 group-hover:text-blue-600" style={{ color: 'var(--text-color)' }}>
                          {milestone.title}
                        </h3>
                        
                        {/* Animated Description */}
                        <p className="text-lg leading-relaxed transform transition-all duration-700 group-hover:translate-x-1" style={{ color: 'var(--text-secondary)' }}>
                          {milestone.description}
                        </p>
                        
                        {/* Animated Decorative Line */}
                        <div className={`w-16 h-1 bg-gradient-to-r from-blue-500 to-green-500 mt-4 transform transition-all duration-700 group-hover:w-24 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}></div>
                      </div>
                    </div>
                    
                    {/* Enhanced Timeline Dot */}
                    <div className="relative z-10">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full border-4 border-white shadow-xl transform transition-all duration-500 group-hover:scale-150 group-hover:rotate-180 animate-pulse"></div>
                      
                      {/* Animated Ring Around Dot */}
                      <div className="absolute inset-0 w-6 h-6 border-2 border-blue-400 rounded-full animate-ping opacity-75"></div>
                      
                      {/* Hover Effect Ring */}
                      <div className="absolute inset-0 w-6 h-6 border-2 border-transparent rounded-full group-hover:border-blue-300 group-hover:scale-200 transition-all duration-500"></div>
                    </div>
                    
                    <div className="w-1/2"></div>
                  </div>
                </SlideOnScroll>
              ))}
            </div>
            
            {/* Floating Animation Elements */}
            <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-32 right-16 w-3 h-3 bg-green-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-20 left-20 w-5 h-5 bg-blue-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-40 right-12 w-2 h-2 bg-green-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: 'var(--text-color)' }}>
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <SlideOnScroll key={index}>
                <div className="text-center p-6 rounded-lg hover:shadow-lg transition">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {member.description}
                  </p>
                </div>
              </SlideOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 hover:scale-110"
          aria-label="Scroll to top"
        >
          <FiArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default About;