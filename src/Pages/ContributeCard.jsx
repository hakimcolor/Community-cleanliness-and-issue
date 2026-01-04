import React, { useState, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { X, Calendar, Tag, MapPin, DollarSign } from 'lucide-react';
import { AuthContext } from '../Context/AuthContext';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContributeCard = () => {
  const issue = useLoaderData();
  const { user } = useContext(AuthContext);
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
    <div className="p-4 sm:p-6 mt-13">
      <title>ContributeCard | Community Cleanliness</title>

      <div className="max-w-3xl mx-auto text-center text-3xl font-bold pb-5 text-blue-500">
        Pay Cleanup Contribution
      </div>
      <div className="max-w-3xl mx-auto  bg-gradient-to-br from-[#2E8B57]/90 via-[#3CB371]/80 to-[#90EE90]/70 shadow-xl rounded-2xl overflow-hidden transition hover:shadow-2xl">
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-56 sm:h-72 md:h-80 object-cover"
        />
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3">
            {issue.title}
          </h1>

          <div className="flex flex-wrap gap-3  text-sm sm:text-base mb-4">
            <span className="flex items-center gap-1">
              <Tag size={16} /> {issue.category}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {issue.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} /> {issue.date}
            </span>
            <span className="flex items-center gap-1">
              <DollarSign size={16} /> ${issue.amount}
            </span>
          </div>

          <p className="text-gray-700 text-sm sm:text-base mb-6">
            {issue.description}
          </p>

          <button
            onClick={() => {
              toast.info('Opening contribution form...', {
                position: 'top-right',
                autoClose: 2000,
              });
              setShowModal(true);
            }}
            className="bg-green-600 text-white w-full sm:w-auto px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer"
          >
            Pay Clean-Up Contribution
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-3">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => {
                toast.warn('Contribution form closed', {
                  position: 'top-right',
                  autoClose: 2000,
                });
                setShowModal(false);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <X size={22} />
            </button>

            <div className="text-center mb-5">
              <h2 className="text-xl sm:text-2xl font-semibold text-blue-700">
                Pay Contribution
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                for "{issue.title}" — {issue.category}
              </p>
            </div>

            <div className="border rounded-lg p-3 sm:p-4 mb-5 bg-gray-50 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
              <img
                src={issue.image}
                alt={issue.title}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
              />
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                  {issue.title}
                </h3>
                <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start gap-1">
                  <MapPin size={14} /> {issue.location}
                </p>
                <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start gap-1">
                  <Calendar size={14} /> {issue.date}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                  Contributor Name
                </label>
                <input
                  type="text"
                  name="contributorName"
                  value={formData.contributorName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base bg-gray-100 text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base focus:ring-2 focus:ring-green-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                  Date
                </label>
                <input
                  type="text"
                  value={today}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base bg-gray-100 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                  Additional Info (optional)
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any extra details..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm sm:text-base min-h-[80px] focus:ring-2 focus:ring-green-500 outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium text-sm sm:text-base transition"
              >
                Submit Contribution
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ContributeCard;
