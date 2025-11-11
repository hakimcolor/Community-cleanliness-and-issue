import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 dark:text-indigo-400 mb-8 text-center">
        Contact Us
      </h1>

      <p className="text-gray-700 dark:text-gray-300 text-center mb-10 sm:text-lg">
        Get in touch with us through the following channels:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-800 dark:text-gray-500">
        {/* Email */}
        <div className="flex items-center space-x-4">
          <FaEnvelope className="text-indigo-600 dark:text-indigo-400 text-2xl" />
          <a href="mailto:hakimcolor777@gmail.com" className="hover:underline">
            hakimcolor777@gmail.com
          </a>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-4">
          <FaPhone className="text-indigo-600 dark:text-indigo-400 text-2xl" />
          <span>+880 1818 777 856</span>
        </div>

        {/* WhatsApp */}
        <div className="flex items-center space-x-4">
          <FaWhatsapp className="text-green-500 text-2xl" />
          <a
            href="https://wa.me/01818777856"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Facebook */}
        <div className="flex items-center space-x-4">
          <FaFacebookF className="text-blue-600 text-2xl" />
          <a
            href="https://www.facebook.com/hakimcolorofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Facebook Page
          </a>
        </div>

        {/* Instagram */}
        <div className="flex items-center space-x-4">
          <FaInstagram className="text-pink-500 text-2xl" />
          <a
            href="https://www.instagram.com/hakim.color/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Instagram
          </a>
        </div>

        {/* X / Twitter */}
        <div className="flex items-center space-x-4">
          <FaTwitter className="text-blue-400 text-2xl" />
          <a
            href="https://x.com/hakimcolor"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            X / Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
