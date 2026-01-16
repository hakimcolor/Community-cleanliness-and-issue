import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaGlobe,
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SlideOnScroll from './SlideOnScroll';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', '7ecdb9b5-f537-4155-ab8c-745a33ca4a13');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.', {
          position: 'top-right',
          autoClose: 5000,
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send message. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-blue-600 dark:text-blue-400 text-2xl" />,
      title: 'Email Us',
      content: 'hakimcolor777@gmail.com',
      link: 'mailto:hakimcolor777@gmail.com',
      description: 'Send us an email anytime'
    },
    {
      icon: <FaPhone className="text-green-600 dark:text-green-400 text-2xl" />,
      title: 'Call Us',
      content: '+880 1818 777 856',
      link: 'tel:+8801818777856',
      description: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: <FaGlobe className="text-indigo-600 dark:text-indigo-400 text-2xl" />,
      title: 'Portfolio',
      content: 'View My Work',
      link: 'https://hakimcolorportfolio.vercel.app/',
      description: 'Check out my portfolio website'
    },
    {
      icon: <FaMapMarkerAlt className="text-red-600 dark:text-red-400 text-2xl" />,
      title: 'Location',
      content: 'Dhaka, Bangladesh',
      link: '#',
      description: 'Come say hello at our office'
    }
  ];

  const socialLinks = [
    {
      icon: <FaWhatsapp className="text-green-500 text-2xl" />,
      name: 'WhatsApp',
      link: 'https://wa.me/01818777856',
      color: 'hover:bg-green-500'
    },
    {
      icon: <FaFacebookF className="text-blue-600 text-2xl" />,
      name: 'Facebook',
      link: 'https://www.facebook.com/hakimcolorofficial',
      color: 'hover:bg-blue-600'
    },
    {
      icon: <FaInstagram className="text-pink-500 text-2xl" />,
      name: 'Instagram',
      link: 'https://www.instagram.com/hakim.color/',
      color: 'hover:bg-pink-500'
    },
    {
      icon: <FaTwitter className="text-blue-400 text-2xl" />,
      name: 'Twitter',
      link: 'https://x.com/hakimcolor',
      color: 'hover:bg-blue-400'
    }
  ];

  return (
    <div className="min-h-screen py-12 mt-16" style={{ backgroundColor: 'var(--bg-color)' }}>
      <Helmet>
        <title>Contact Us | Community Cleanliness & Issue Reporting Platform</title>
        <meta name="description" content="Get in touch with our community platform team. We're here to help with any questions or support you need." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <SlideOnScroll>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--text-color)' }}>
              Get In Touch
            </h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Have questions about our platform? Need support with reporting issues? 
              We're here to help you make your community cleaner and better.
            </p>
          </div>
        </SlideOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <SlideOnScroll>
            <div className="rounded-2xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-500" style={{ backgroundColor: 'var(--bg-color)' }}>
              <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 transform focus:scale-105"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 transform focus:scale-105"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 transform focus:scale-105"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 transform focus:scale-105 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </SlideOnScroll>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <SlideOnScroll>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                    style={{ backgroundColor: 'var(--bg-color)' }}
                  >
                    <div className="flex items-center mb-4">
                      {info.icon}
                      <h3 className="text-lg font-semibold ml-3" style={{ color: 'var(--text-color)' }}>
                        {info.title}
                      </h3>
                    </div>
                    {info.link !== '#' ? (
                      <a
                        href={info.link}
                        target={info.link.startsWith('http') ? '_blank' : '_self'}
                        rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="text-blue-600 dark:text-blue-400 font-medium hover:underline block mb-2 transition-colors duration-300"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                        {info.content}
                      </p>
                    )}
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {info.description}
                    </p>
                  </div>
                ))}
              </div>
            </SlideOnScroll>

            {/* Social Media Links */}
            <SlideOnScroll>
              <div className="rounded-2xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-500" style={{ backgroundColor: 'var(--bg-color)' }}>
                <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--text-color)' }}>
                  Follow Us
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color} hover:text-white group border-2 border-gray-200 dark:border-gray-600 hover:border-transparent`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <p className="text-center mt-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Stay connected with our community updates and news
                </p>
              </div>
            </SlideOnScroll>

            {/* Quick Response Promise */}
            <SlideOnScroll>
              <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white text-center shadow-xl border-2 border-transparent hover:border-white transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                <h3 className="text-2xl font-bold mb-4">Quick Response Promise</h3>
                <p className="text-lg mb-4">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm opacity-90">
                  <FaClock />
                  <span>Average response time: 4-6 hours</span>
                </div>
              </div>
            </SlideOnScroll>
          </div>
        </div>

        {/* FAQ Section */}
        <SlideOnScroll>
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text-color)' }}>
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  question: "How do I report a community issue?",
                  answer: "Simply create an account, navigate to 'Add Issue', fill out the form with details and photos, and submit. Your report will be visible to the community immediately."
                },
                {
                  question: "Can I contribute to issues reported by others?",
                  answer: "Yes! You can browse all reported issues and contribute financially to help resolve them. Every contribution helps make our communities better."
                },
                {
                  question: "Is my personal information safe?",
                  answer: "Absolutely. We take privacy seriously and only display necessary information. Your contact details are kept secure and never shared without permission."
                },
                {
                  question: "How do I track the progress of reported issues?",
                  answer: "You can view all your reported issues in your dashboard and see real-time updates on their status and any contributions received."
                }
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                  style={{ backgroundColor: 'var(--bg-color)' }}
                >
                  <h4 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-color)' }}>
                    {faq.question}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SlideOnScroll>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Contact;
