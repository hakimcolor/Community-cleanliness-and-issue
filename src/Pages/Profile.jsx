import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Helmet } from 'react-helmet';
import { FiUser, FiMail, FiCalendar, FiEdit3, FiCamera, FiSave, FiX, FiShield, FiMapPin, FiPhone, FiSettings, FiAward } from 'react-icons/fi';
import { MdVerified, MdDashboard } from 'react-icons/md';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    displayName: user?.displayName || '',
    phone: user?.phoneNumber || '',
    location: ''
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo({
      displayName: user?.displayName || '',
      phone: user?.phoneNumber || '',
      location: ''
    });
    setIsEditing(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getProfileImage = () => {
    if (imageError || !user?.photoURL) {
      return 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=User';
    }
    return user.photoURL;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen py-6 mt-10 px-4" style={{ backgroundColor: 'var(--bg-color)' }}>
      <Helmet>
        <title>Profile | Community Cleanliness Platform</title>
        <meta name="description" content="Manage your profile and account settings" />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden" style={{ backgroundColor: 'var(--bg-color)' }}>
              {/* Cover Section */}
              <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative">
                <div className="absolute inset-0 bg-black/30"></div>
              </div>

              {/* Profile Info */}
              <div className="relative px-6 pb-6 text-center">
                {/* Profile Picture */}
                <div className="relative inline-block -mt-16 mb-4">
                  {!imageError && (user?.photoURL || true) ? (
                    <img
                      src={getProfileImage()}
                      alt="Profile"
                      className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover bg-gray-200 dark:bg-gray-700"
                      onError={handleImageError}
                      onLoad={() => setImageError(false)}
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <FiUser size={48} className="text-white" />
                    </div>
                  )}
                  <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                    <FiCamera size={16} />
                  </button>
                </div>

                {/* User Info */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
                      {user?.displayName || 'User Name'}
                    </h2>
                    {user?.emailVerified && (
                      <MdVerified className="text-blue-500" size={24} title="Verified Account" />
                    )}
                  </div>
                  <p className="text-lg mb-3" style={{ color: 'var(--text-secondary)' }}>
                    {user?.email || 'user@example.com'}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <FiCalendar size={16} />
                    <span>Joined {formatDate(user?.metadata?.creationTime)}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                    user?.emailVerified 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                  }`}>
                    <FiShield size={16} />
                    {user?.emailVerified ? 'Verified Account' : 'Pending Verification'}
                  </span>
                </div>

                {/* Edit Button */}
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg font-medium"
                  >
                    <FiEdit3 size={18} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <FiSave size={16} />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                    >
                      <FiX size={16} />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 grid grid-cols-3 gap-4"
            >
              <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">--</div>
                <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Issues</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">--</div>
                <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Contributions</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">--</div>
                <div className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Points</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Personal Information */}
            <div className="rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 p-6" style={{ backgroundColor: 'var(--bg-color)' }}>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ color: 'var(--text-color)' }}>
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FiUser className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Display Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Display Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedInfo.displayName}
                      onChange={(e) => setEditedInfo({...editedInfo, displayName: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      style={{ 
                        backgroundColor: 'var(--bg-color)', 
                        color: 'var(--text-color)' 
                      }}
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600" style={{ color: 'var(--text-color)' }}>
                      {user?.displayName || 'Not provided'}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Email Address
                  </label>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-between">
                    <span style={{ color: 'var(--text-color)' }}>
                      {user?.email || 'Not provided'}
                    </span>
                    {user?.emailVerified && (
                      <MdVerified className="text-green-500" size={18} />
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedInfo.phone}
                      onChange={(e) => setEditedInfo({...editedInfo, phone: e.target.value})}
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      style={{ 
                        backgroundColor: 'var(--bg-color)', 
                        color: 'var(--text-color)' 
                      }}
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600" style={{ color: 'var(--text-color)' }}>
                      {user?.phoneNumber || editedInfo.phone || 'Not provided'}
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedInfo.location}
                      onChange={(e) => setEditedInfo({...editedInfo, location: e.target.value})}
                      placeholder="Enter your location"
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      style={{ 
                        backgroundColor: 'var(--bg-color)', 
                        color: 'var(--text-color)' 
                      }}
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600" style={{ color: 'var(--text-color)' }}>
                      {editedInfo.location || 'Not provided'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 p-6" style={{ backgroundColor: 'var(--bg-color)' }}>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ color: 'var(--text-color)' }}>
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <FiShield className="text-green-600 dark:text-green-400" size={20} />
                </div>
                Account Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <FiCalendar className="text-blue-600 dark:text-blue-400" size={18} />
                    <span className="font-medium" style={{ color: 'var(--text-color)' }}>Member Since</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {formatDate(user?.metadata?.creationTime)}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <FiCalendar className="text-green-600 dark:text-green-400" size={18} />
                    <span className="font-medium" style={{ color: 'var(--text-color)' }}>Last Sign In</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {formatDate(user?.metadata?.lastSignInTime)}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <FiShield className="text-purple-600 dark:text-purple-400" size={18} />
                    <span className="font-medium" style={{ color: 'var(--text-color)' }}>Account Status</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {user?.emailVerified ? 'Verified' : 'Pending Verification'}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3 mb-2">
                    <FiSettings className="text-orange-600 dark:text-orange-400" size={18} />
                    <span className="font-medium" style={{ color: 'var(--text-color)' }}>User ID</span>
                  </div>
                  <p className="text-xs font-mono bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded inline-block" style={{ color: 'var(--text-color)' }}>
                    {user?.uid?.substring(0, 12)}...
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Summary */}
            <div className="rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 p-6" style={{ backgroundColor: 'var(--bg-color)' }}>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3" style={{ color: 'var(--text-color)' }}>
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <FiAward className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                Activity Summary
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MdDashboard className="text-white" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">--</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Issues Reported</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiAward className="text-white" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">--</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Contributions Made</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiAward className="text-white" size={24} />
                  </div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">--</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Community Points</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
