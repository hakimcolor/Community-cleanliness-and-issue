import React, { useState, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { X, Calendar, Tag, MapPin, DollarSign, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../Context/AuthContext';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContributeCard = () => {
  const issue = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    contributorName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    amount: issue.amount || '',
    additionalInfo: '',
  });

  const today = new Date().toLocaleDateString();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contributionData = {
      issueTitle: issue.title,
      amount: formData.amount,
      contributorName: formData.contributorName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      date: today,
      additionalInfo: formData.additionalInfo,
    };

    try {
      const res = await fetch(
        'https://community-clen.vercel.app/contributions',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contributionData),
        }
      );

      const data = await res.json();
      if (data.insertedId) {
        toast.success('Contribution saved successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
        setShowModal(false);
      } else {
        toast.error('Failed to save contribution', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Server error occurred', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen py-8 mt-16" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="p-4 sm:p-6">
        <title>ContributeCard | Community Cleanliness</title>

        {/* Title and Back Button Side by Side */}
        <div className="max-w-3xl mx-auto flex items-center justify-between mb-5">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 font-semibold hover:underline cursor-pointer border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-white p-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={18} /> Back
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold text-center flex-1 mx-4" style={{ color: 'var(--text-color)' }}>
            Pay Cleanup Contribution
          </h1>
          
          {/* Empty div for balance */}
          <div className="w-[120px]"></div>
        </div>
        <div className="max-w-3xl mx-auto shadow-xl rounded-2xl overflow-hidden transition hover:shadow-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 duration-500" style={{ backgroundColor: 'var(--bg-color)' }}>
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-56 sm:h-72 md:h-80 object-cover"
          />
          <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: 'var(--text-color)' }}>
              {issue.title}
            </h1>

            <div className="flex flex-wrap gap-3 text-sm sm:text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
              <span className="flex items-center gap-1">
                <Tag size={16} className="text-blue-600 dark:text-blue-400" /> 
                <span className="font-medium text-blue-600 dark:text-blue-400">Category:</span> {issue.category}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={16} className="text-green-600 dark:text-green-400" /> 
                <span className="font-medium text-green-600 dark:text-green-400">Location:</span> {issue.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} className="text-blue-600 dark:text-blue-400" /> 
                <span className="font-medium text-blue-600 dark:text-blue-400">Date:</span> {issue.date}
              </span>
              <span className="flex items-center gap-1">
                <DollarSign size={16} className="text-red-600 dark:text-red-400" /> 
                <span className="font-medium text-red-600 dark:text-red-400">Amount:</span> 
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">${issue.amount}</span>
              </span>
            </div>

            <p className="text-sm sm:text-base mb-6" style={{ color: 'var(--text-secondary)' }}>
              {issue.description}
            </p>

            <button
              onClick={() => {
                // Check if user is logged in
                if (!user) {
                  toast.info('Please login to make a contribution', {
                    position: 'top-right',
                    autoClose: 2000,
                  });
                  // Redirect to login page after a short delay
                  setTimeout(() => {
                    navigate('/signin');
                  }, 2000);
                  return;
                }
                
                // If user is logged in, show the contribution form
                toast.info('Opening contribution form...', {
                  position: 'top-right',
                  autoClose: 2000,
                });
                setShowModal(true);
              }}
              className="bg-blue-600 text-white w-full sm:w-auto px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
            >
              Pay Clean-Up Contribution
            </button>
          </div>
        </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-2xl relative animate-fadeIn border-2 border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--bg-color)' }}>
            <button
              onClick={() => {
                toast.warn('Contribution form closed', {
                  position: 'top-right',
                  autoClose: 2000,
                });
                setShowModal(false);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition-colors duration-300"
            >
              <X size={22} />
            </button>

            <div className="text-center mb-5">
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-400">
                Pay Contribution
              </h2>
              <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                for "{issue.title}" — {issue.category}
              </p>
            </div>

            <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-3 sm:p-4 mb-5 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4" style={{ backgroundColor: 'var(--bg-color)' }}>
              <img
                src={issue.image}
                alt={issue.title}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
              />
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-base sm:text-lg" style={{ color: 'var(--text-color)' }}>
                  {issue.title}
                </h3>
                <p className="text-sm flex items-center justify-center sm:justify-start gap-1" style={{ color: 'var(--text-secondary)' }}>
                  <MapPin size={14} className="text-green-600 dark:text-green-400" /> {issue.location}
                </p>
                <p className="text-sm flex items-center justify-center sm:justify-start gap-1" style={{ color: 'var(--text-secondary)' }}>
                  <Calendar size={14} className="text-blue-600 dark:text-blue-400" /> {issue.date}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base" style={{ color: 'var(--text-color)' }}>
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base" style={{ color: 'var(--text-color)' }}>
                  Contributor Name
                </label>
                <input
                  type="text"
                  name="contributorName"
                  value={formData.contributorName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium mb-1 text-sm sm:text-base" style={{ color: 'var(--text-color)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm sm:text-base bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-1 text-sm sm:text-base" style={{ color: 'var(--text-color)' }}>
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base" style={{ color: 'var(--text-color)' }}>
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base" style={{ color: 'var(--text-color)' }}>
                  Date
                </label>
                <input
                  type="text"
                  value={today}
                  disabled
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm sm:text-base bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                />
              </div>

              <div>
                <label className="block font-medium mb-1 text-sm sm:text-base" style={{ color: 'var(--text-color)' }}>
                  Additional Info (optional)
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any extra details..."
                  className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm sm:text-base min-h-[80px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
              >
                Submit Contribution
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
      </div>
    </div>
  );
};

export default ContributeCard;
