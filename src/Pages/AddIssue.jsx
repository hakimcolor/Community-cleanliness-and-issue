
import React, { useContext, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';
import { FiSend, FiMapPin, FiDollarSign, FiImage, FiFileText, FiTag, FiUser } from 'react-icons/fi';
import { Helmet } from 'react-helmet';

const AddIssue = () => {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      title: e.target.title.value.trim(),
      category: e.target.category.value,
      location: e.target.location.value.trim(),
      description: e.target.description.value.trim(),
      image: e.target.image.value.trim(),
      amount: parseFloat(e.target.amount.value),
      status: 'ongoing',
      date: new Date().toISOString(),
      email: user.email,
    };

    try {
      const res1 = await fetch('https://community-clen.vercel.app/myissue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res1.ok) throw new Error('Failed to add issue in MyIssues');

      const res2 = await fetch('https://community-clen.vercel.app/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res2.ok) throw new Error('Failed to add issue in All Issues');

      toast.success('Issue added successfully!');
      e.target.reset();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Helmet>
        <title>Add Issue | Community Cleanliness Dashboard</title>
      </Helmet>

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-color)' }}>
          Report New Issue
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Help improve your community by reporting issues that need attention
        </p>
      </div>

      <Toaster position="top-right" reverseOrder={false} />

      {/* Form Container */}
      <div className="rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-500 p-8" style={{ backgroundColor: 'var(--bg-color)' }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Issue Title */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                <FiFileText size={16} className="text-blue-600 dark:text-blue-400" />
                Issue Title *
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 transform focus:scale-105"
                placeholder="Enter a clear, descriptive title for the issue"
              />
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                <FiTag size={16} className="text-green-600 dark:text-green-400" />
                Category *
              </label>
              <select
                name="category"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 transform focus:scale-105"
              >
                <option value="" disabled>
                  Select issue category
                </option>
                <option value="Cleanliness">Garbage & Waste Management</option>
                <option value="Public Space">Illegal Construction</option>
                <option value="Garbage Management">Broken Public Property</option>
                <option value="Road Damager">Road Damage & Infrastructure</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                <FiMapPin size={16} className="text-red-600 dark:text-red-400" />
                Location *
              </label>
              <input
                type="text"
                name="location"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 transform focus:scale-105"
                placeholder="Enter specific location or address"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                <FiFileText size={16} className="text-purple-600 dark:text-purple-400" />
                Description *
              </label>
              <textarea
                name="description"
                required
                rows="4"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 transform focus:scale-105 resize-none"
                placeholder="Provide detailed description of the issue, including severity and impact on the community"
              ></textarea>
            </div>

            {/* Image URL */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                <FiImage size={16} className="text-indigo-600 dark:text-indigo-400" />
                Image URL (Optional)
              </label>
              <input
                type="url"
                name="image"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 transform focus:scale-105"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Suggested Budget */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                <FiDollarSign size={16} className="text-yellow-600 dark:text-yellow-400" />
                Suggested Fix Budget *
              </label>
              <input
                type="number"
                name="amount"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 transform focus:scale-105"
                placeholder="Enter estimated cost in USD"
              />
            </div>

            {/* User Email */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                <FiUser size={16} className="text-gray-600 dark:text-gray-400" />
                Reporter Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t-2 border-gray-200 dark:border-gray-700">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <FiSend size={20} />
                  Submit Issue Report
                </>
              )}
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            💡 Tips for Better Reports
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Be specific about the location and provide landmarks if possible</li>
            <li>• Include clear photos to help others understand the issue</li>
            <li>• Provide realistic budget estimates for fixing the problem</li>
            <li>• Check if similar issues have already been reported</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddIssue;
