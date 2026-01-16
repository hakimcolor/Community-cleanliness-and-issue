
import React, { useState, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { FiEdit, FiTrash2, FiEye, FiCalendar, FiMapPin, FiDollarSign, FiTag, FiClock, FiX } from 'react-icons/fi';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MYIssues = () => {
  const allissues = useLoaderData();
  const { user } = useContext(AuthContext);

  const initialIssues = allissues.filter(
    (issue) => issue.email === user?.email
  );
  const [myIssues, setMyIssues] = useState(initialIssues);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleView = (issue) => {
    setSelectedIssue(issue);
    setShowViewModal(true);
  };

  const handleUpdate = (issue) => {
    setSelectedIssue(issue);
    setShowUpdateModal(true);
    toast.info('Update your issue details', { position: 'top-right' });
  };

  const handleDelete = (issue) => {
    setSelectedIssue(issue);
    setShowDeleteModal(true);
    toast.warning('Are you sure you want to delete this issue?', {
      position: 'top-right',
    });
  };

  const confirmDelete = async () => {
    if (!selectedIssue?._id) return;
    setIsDeleting(true);
    try {
      const res = await fetch(
        `https://community-clen.vercel.app/myissues/${selectedIssue._id}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        toast.success('Issue deleted successfully!', { position: 'top-right' });
        setMyIssues(
          myIssues.filter((issue) => issue._id !== selectedIssue._id)
        );
        setShowDeleteModal(false);
        setSelectedIssue(null);
      } else {
        throw new Error('Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete issue.', { position: 'top-right' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedIssue?._id) return;
    setIsUpdating(true);

    const form = e.target;
    const updatedData = {
      title: form.title.value,
      category: form.category.value,
      amount: Number(form.amount.value),
      description: form.description.value,
      status: form.status.value,
    };

    try {
      const res = await fetch(
        `https://community-clen.vercel.app/myissues/${selectedIssue._id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData),
        }
      );

      if (res.ok) {
        toast.success('Issue updated successfully!', {
          position: 'top-right',
        });
        setMyIssues(
          myIssues.map((issue) =>
            issue._id === selectedIssue._id
              ? { ...issue, ...updatedData }
              : issue
          )
        );
        setShowUpdateModal(false);
        setSelectedIssue(null);
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      console.error('Update error:', err);
      toast.error('Failed to update issue.', { position: 'top-right' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
    setShowUpdateModal(false);
    setShowViewModal(false);
    setSelectedIssue(null);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'ongoing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'ended':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'resolved':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatBudget = (amount) => {
    const millions = Math.floor(amount / 1000000);
    const thousands = Math.floor((amount % 1000000) / 1000);
    const dollars = Math.floor(amount % 1000);
    const cents = Math.floor((amount % 1) * 100);
    
    let result = [];
    
    if (millions > 0) result.push(`${millions}M`);
    if (thousands > 0) result.push(`${thousands}K`);
    if (dollars > 0) result.push(`${dollars}D`);
    if (cents > 0) result.push(`${cents}S`);
    
    return result.length > 0 ? result.join(' ') : '0D';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <Helmet>
        <title>My Issues | Community Cleanliness Dashboard</title>
      </Helmet>

      <ToastContainer autoClose={3000} theme="colored" />

      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-color)' }}>
          My Submitted Issues
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Manage and track all the issues you've reported to the community
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300" style={{ backgroundColor: 'var(--bg-color)' }}>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FiTag size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
                {myIssues.length}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Total Issues
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 transition-all duration-300" style={{ backgroundColor: 'var(--bg-color)' }}>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <FiClock size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
                {myIssues.filter(issue => issue.status?.toLowerCase() === 'ongoing').length}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Ongoing Issues
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300" style={{ backgroundColor: 'var(--bg-color)' }}>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FiDollarSign size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
                {formatBudget(myIssues.reduce((sum, issue) => sum + (issue.amount || 0), 0))}
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Total Budget
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Issues Grid */}
      {myIssues.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myIssues.map((issue) => (
            <div
              key={issue._id}
              className="rounded-xl shadow-lg hover:shadow-2xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              style={{ backgroundColor: 'var(--bg-color)' }}
            >
              {/* Issue Image */}
              {issue.image && (
                <div className="w-full h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              
              {/* Issue Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold leading-tight" style={{ color: 'var(--text-color)' }}>
                    {issue.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                    {issue.status || 'ongoing'}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <FiTag size={14} className="text-blue-600 dark:text-blue-400" />
                    <span>{issue.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <FiMapPin size={14} className="text-green-600 dark:text-green-400" />
                    <span>{issue.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <FiDollarSign size={14} className="text-red-600 dark:text-red-400" />
                    <span className="font-semibold text-blue-600 dark:text-blue-400">${issue.amount}</span>
                  </div>
                  {issue.date && (
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <FiCalendar size={14} className="text-purple-600 dark:text-purple-400" />
                      <span>{new Date(issue.date).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleView(issue)}
                    className="flex-1 flex items-center justify-center px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                    title="View Issue"
                  >
                    <FiEye size={16} />
                  </button>
                  <button
                    onClick={() => handleUpdate(issue)}
                    className="flex-1 flex items-center justify-center px-2 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105"
                    title="Edit Issue"
                  >
                    <FiEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(issue)}
                    className="flex-1 flex items-center justify-center px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                    title="Delete Issue"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700" style={{ backgroundColor: 'var(--bg-color)' }}>
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FiTag size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
            No Issues Found
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            You haven't reported any issues yet. Start by adding your first issue report.
          </p>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedIssue && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
                  Issue Details
                </h3>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <FiX size={24} style={{ color: 'var(--text-color)' }} />
                </button>
              </div>
              
              {selectedIssue.image && (
                <img
                  src={selectedIssue.image}
                  alt={selectedIssue.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2" style={{ color: 'var(--text-color)' }}>
                    {selectedIssue.title}
                  </h4>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {selectedIssue.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Category:</span>
                    <p style={{ color: 'var(--text-color)' }}>{selectedIssue.category}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Location:</span>
                    <p style={{ color: 'var(--text-color)' }}>{selectedIssue.location}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Budget:</span>
                    <p className="font-semibold text-blue-600 dark:text-blue-400">${selectedIssue.amount}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Status:</span>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIssue.status)}`}>
                      {selectedIssue.status || 'ongoing'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedIssue && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  Update Issue
                </h3>
                <button
                  onClick={handleCancel}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <FiX size={20} style={{ color: 'var(--text-color)' }} />
                </button>
              </div>
              
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                    Title
                  </label>
                  <input
                    name="title"
                    defaultValue={selectedIssue.title}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                    Category
                  </label>
                  <select
                    name="category"
                    defaultValue={selectedIssue.category}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300"
                    required
                  >
                    <option value="Cleanliness">Garbage & Waste Management</option>
                    <option value="Public Space">Illegal Construction</option>
                    <option value="Garbage Management">Broken Public Property</option>
                    <option value="Road Damager">Road Damage & Infrastructure</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                    Budget
                  </label>
                  <input
                    type="number"
                    name="amount"
                    defaultValue={selectedIssue.amount}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={selectedIssue.description}
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 resize-none"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-color)' }}>
                    Status
                  </label>
                  <select
                    name="status"
                    defaultValue={selectedIssue.status || 'ongoing'}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300"
                    required
                  >
                    <option value="ongoing">Ongoing</option>
                    <option value="ended">Ended</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                    style={{ color: 'var(--text-color)' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isUpdating ? 'Updating...' : 'Update Issue'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedIssue && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="w-full max-w-md rounded-2xl shadow-2xl border-2 border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="p-6 text-center">
              <div className="p-4 bg-red-100 dark:bg-red-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FiTrash2 size={32} className="text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-red-600 dark:text-red-400">
                Delete Issue
              </h3>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                Are you sure you want to delete "{selectedIssue.title}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
                  style={{ color: 'var(--text-color)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MYIssues;
