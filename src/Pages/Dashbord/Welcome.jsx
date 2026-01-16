import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlus, FiList, FiHeart, FiTrendingUp, FiUsers, FiAward, FiTarget } from 'react-icons/fi';
import { AuthContext } from '../../Context/AuthContext';

const Welcome = () => {
  const { user } = useContext(AuthContext);

  const quickActions = [
    {
      title: 'Report New Issue',
      description: 'Submit a new community issue',
      icon: <FiPlus size={24} />,
      link: '/dashbord/addissues',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      title: 'View My Issues',
      description: 'Manage your reported issues',
      icon: <FiList size={24} />,
      link: '/dashbord/myissues',
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      title: 'My Contributions',
      description: 'Track your community impact',
      icon: <FiHeart size={24} />,
      link: '/dashbord/contribution',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    }
  ];

  const stats = [
    {
      title: 'Community Impact',
      value: '2,500+',
      description: 'Issues Resolved',
      icon: <FiTrendingUp size={32} />,
      color: 'text-green-600'
    },
    {
      title: 'Active Members',
      value: '1,200+',
      description: 'Contributors',
      icon: <FiUsers size={32} />,
      color: 'text-blue-600'
    },
    {
      title: 'Recognition',
      value: '95%',
      description: 'Success Rate',
      icon: <FiAward size={32} />,
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12 rounded-2xl border-2 border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: 'var(--bg-color)' }}
      >
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <FiTarget size={40} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-color)' }}>
            Welcome Back, {user?.displayName || 'Community Member'}! 👋
          </h1>
          <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
            Ready to make a difference in your community today?
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Your dashboard is your command center for community engagement. Report issues, 
            track progress, and see the positive impact you're making in your neighborhood.
          </p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-color)' }}>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="h-full"
            >
              <Link
                to={action.link}
                className={`flex flex-col justify-center items-center h-48 w-full p-6 rounded-xl bg-gradient-to-r ${action.color} ${action.hoverColor} text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl text-center`}
              >
                <div className="p-4 bg-white/20 rounded-lg mb-4">
                  {action.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {action.title}
                  </h3>
                  <p className="text-sm opacity-90">
                    {action.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-color)' }}>
          Community Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300"
              style={{ backgroundColor: 'var(--bg-color)' }}
            >
              <div className="flex items-center gap-4">
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
                    {stat.value}
                  </h3>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>
                    {stat.title}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Getting Started Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="p-8 rounded-2xl border-2 border-gray-200 dark:border-gray-700"
        style={{ backgroundColor: 'var(--bg-color)' }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-color)' }}>
          Getting Started Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--text-color)' }}>
                  Report Your First Issue
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Start by reporting a community issue you've noticed. Include photos and detailed descriptions.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-green-600 dark:text-green-400 font-bold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--text-color)' }}>
                  Track Progress
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Monitor your reported issues and see how they're being addressed by the community.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--text-color)' }}>
                  Contribute to Solutions
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Support community cleanup efforts and contribute to making your area better.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-yellow-600 dark:text-yellow-400 font-bold text-sm">4</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--text-color)' }}>
                  Build Community
                </h4>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Connect with neighbors and work together to create positive change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;