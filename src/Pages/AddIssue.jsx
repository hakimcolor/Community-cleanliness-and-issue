// AddIssue.jsx
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';

const AddIssue = () => {
  const { user } = useContext(AuthContext); // Logged-in user

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title: e.target.title.value,
      category: e.target.category.value,
      location: e.target.location.value,
      description: e.target.description.value,
      image: e.target.image.value,
      amount: parseFloat(e.target.amount.value),
      status: 'ongoing', // default
      date: new Date(),
      email: user.email,
    };

    fetch('http://localhost:3000/issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success('Issue added successfully!');
        e.target.reset();
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to add issue.');
      });
  };

  return (
    <div className="card max-w-md mx-auto mt-12 shadow-2xl rounded-3xl overflow-hidden border border-gray-200 bg-white">
      <div className="card-body p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Report New Issue
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Issue Title */}
          <div>
            <label className="label font-semibold text-gray-700">
              Issue Title
            </label>
            <input
              type="text"
              name="title"
              required
              className="input w-full rounded-xl border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
              placeholder="Enter issue title"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="label font-semibold text-gray-700">
              Category
            </label>
            <select
              defaultValue={''}
              name="category"
              required
              className="select w-full rounded-xl border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Public Space">Public Space</option>
              <option value="Garbage Management">Garbage Management</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="label font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              className="input w-full rounded-xl border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
              placeholder="Enter location"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="4"
              className="textarea w-full rounded-2xl border-2 border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200 resize-none"
              placeholder="Describe the issue"
            ></textarea>
          </div>

          {/* Image URL */}
          <div>
            <label className="label font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              className="input w-full rounded-xl border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Suggested Budget */}
          <div>
            <label className="label font-semibold text-gray-700">
              Suggested Fix Budget
            </label>
            <input
              type="number"
              name="amount"
              required
              className="input w-full rounded-xl border-2 border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-200"
              placeholder="Enter amount"
            />
          </div>

          {/* User Email (Read-only) */}
          <div>
            <label className="label font-semibold text-gray-700">
              Your Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="input w-full rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-2 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full mt-4 text-white font-semibold rounded-xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Submit Issue
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddIssue;
