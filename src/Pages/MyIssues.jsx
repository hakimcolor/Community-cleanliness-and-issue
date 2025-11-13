
import React, { useState, useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
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

  const handleUpdate = (issue) => {
    setSelectedIssue(issue);
    setShowUpdateModal(true);
    toast.info('You are updating this issue!', { position: 'bottom-right' });
  };

  const handleDelete = (issue) => {
    setSelectedIssue(issue);
    setShowDeleteModal(true);
    toast.warning('You are about to delete this issue!', {
      position: 'bottom-right',
    });
  };

  const confirmDelete = async () => {
    if (!selectedIssue?._id) return;
    try {
      const res = await fetch(
        `https://community-clen.vercel.app/myissues/${selectedIssue._id}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        toast.success('Deleted successfully!', { position: 'bottom-right' });
        setMyIssues(
          myIssues.filter((issue) => issue._id !== selectedIssue._id)
        );
        setShowDeleteModal(false);
        setSelectedIssue(null);
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      toast.error('Failed to delete issue.', { position: 'bottom-right' });
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedIssue?._id) return;

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
          position: 'bottom-right',
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
    } catch (error) {
      toast.error('Failed to update issue.', { position: 'bottom-right' });
    }
  };

  const handleCancel = () => {
    toast.info('Action cancelled!', { position: 'bottom-right' });
    setShowDeleteModal(false);
    setShowUpdateModal(false);
    setSelectedIssue(null);
  };

  return (
    <div className="min-h-screen max-w-6xl mx-auto mt-20 p-4 text-gray-900 dark:text-gray-100 flex flex-col">
      <Helmet>
        <title>My Issues | Community Cleanliness</title>
      </Helmet>

      <ToastContainer autoClose={2000} theme="colored" />

      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600 dark:text-blue-400">
        My Submitted Issues
      </h2>

      <div className="overflow-x-auto border rounded-xl shadow-lg bg-gray-50 dark:bg-gray-800 flex-grow transition-colors">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 dark:bg-gray-700 uppercase text-gray-800 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myIssues.length ? (
              myIssues.map((issue) => (
                <tr
                  key={issue._id}
                  className="border-b dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                >
                  <td className="px-4 py-2">{issue.title}</td>
                  <td className="px-4 py-2">{issue.category}</td>
                  <td className="px-4 py-2">{issue.amount}</td>
                  <td className="px-4 py-2 capitalize">
                    {issue.status || 'ongoing'}
                  </td>
                  <td className="px-4 py-2 flex justify-center gap-4">
                    <button
                      onClick={() => handleUpdate(issue)}
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600 transition"
                    >
                      <FiEdit
                        size={18}
                        className="text-blue-700 dark:text-blue-300"
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(issue)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-300 dark:bg-red-700 dark:hover:bg-red-600 transition"
                    >
                      <FiTrash2
                        size={18}
                        className="text-red-700 dark:text-red-300"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-5 text-gray-500 dark:text-gray-400"
                >
                  No issues found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showUpdateModal && selectedIssue && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-blue-600 dark:text-blue-400">
              Update Issue
            </h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-3">
              <input
                name="title"
                defaultValue={selectedIssue.title}
                className="w-full border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <input
                name="category"
                defaultValue={selectedIssue.category}
                className="w-full border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <input
                type="number"
                name="amount"
                defaultValue={selectedIssue.amount}
                className="w-full border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <textarea
                name="description"
                defaultValue={selectedIssue.description}
                className="w-full border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <select
                name="status"
                defaultValue={selectedIssue.status || 'ongoing'}
                className="w-full border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
                required
              >
                <option value="ongoing">Ongoing</option>
                <option value="ended">Ended</option>
              </select>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && selectedIssue && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-full max-w-sm text-center shadow-lg">
            <h3 className="text-lg font-semibold mb-3 text-red-600 dark:text-red-400">
              Are you sure?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-5">
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 dark:hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MYIssues;
