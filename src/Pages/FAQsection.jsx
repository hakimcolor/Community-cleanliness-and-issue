// FAQsection.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiMinus } from 'react-icons/hi';

const FAQsection = () => {
  const faqs = [
    {
      question: 'How can I report a community cleanliness issue?',
      answer:
        'You can report an issue by uploading a photo, adding the location, and submitting the report through our platform.',
    },
    {
      question: 'Who can submit reports on this website?',
      answer:
        'Any registered community member can submit reports. Make sure you have an account to submit and track your reports.',
    },
    {
      question: 'How long does it take to resolve an issue?',
      answer:
        'Resolution time depends on the type and severity of the issue. Minor issues are usually addressed within a few days, while major ones may take longer.',
    },
    {
      question: 'Can I track the status of my report?',
      answer:
        "Yes! Once you submit a report, you can track its status in your profile under 'My Reports'.",
    },
    {
      question: 'Is my personal information safe when submitting a report?',
      answer:
        'Absolutely. We prioritize user privacy and only use your information to resolve the reported issues.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-600 dark:text-blue-400 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="rounded-lg p-4 cursor-pointer shadow-sm border"
            initial={{ opacity: 0, borderColor: '#e5e7eb' }} 
            animate={{
              opacity: 1,
              borderColor: activeIndex === index ? '#3b82f6' : '#e5e7eb', 
            }}
            whileHover={{ borderColor: '#2563eb' }} 
            transition={{ delay: index * 0.1, duration: 0.3 }}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-lg">{faq.question}</h3>
              <span className="text-blue-600 dark:text-blue-400">
                {activeIndex === index ? (
                  <HiMinus size={24} />
                ) : (
                  <HiPlus size={24} />
                )}
              </span>
            </div>
            {activeIndex === index && (
              <motion.p
                className="mt-2 text-gray-700 dark:text-gray-300"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                {faq.answer}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQsection;
