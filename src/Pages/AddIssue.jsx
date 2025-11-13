// import React, { useContext } from 'react';
// import toast from 'react-hot-toast';
// import { AuthContext } from '../Context/AuthContext';
// import { FiArrowRight } from 'react-icons/fi';
// import { Helmet } from 'react-helmet';

// const AddIssue = () => {
//   const { user } = useContext(AuthContext);

//  const handleSubmit = async (e) => {
//    e.preventDefault();

//    const formData = {
//      title: e.target.title.value.trim(),
//      category: e.target.category.value,
//      location: e.target.location.value.trim(),
//      description: e.target.description.value.trim(),
//      image: e.target.image.value.trim(),
//      amount: parseFloat(e.target.amount.value),
//      status: 'ongoing',
//      date: new Date().toISOString(),
//      email: user.email,
//    };

//    try {
//      // ১️⃣ প্রথমে MyIssues এ পাঠাও
//      const res1 = await fetch('http://localhost:3000/myissue', {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify(formData),
//      });

//      if (!res1.ok) throw new Error('Failed to add issue in MyIssues');

//      // ২️⃣ তারপর Main Issue কালেকশনেও পাঠাও
//      const res2 = await fetch('http://localhost:3000/issue', {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify(formData),
//      });

//      if (!res2.ok) throw new Error('Failed to add issue in All Issues');

//      toast.success('Issue added successfully in both collections!');
//      e.target.reset();
//    } catch (err) {
//      console.error(err);
//      toast.error('Failed to add issue. Please try again.');
//    }
//  };


//   return (
//     <div className="max-w-md mx-auto mt-20 mb-1 rounded-xl overflow-hidden border border-[#FFD700]/70 shadow-xl bg-gradient-to-br from-[#2E8B57]/90 via-[#3CB371]/80 to-[#90EE90]/70 p-6">
      
//         <title>Addissue | Community Cleanliness</title>
      
//       <h2 className="text-3xl font-bold text-center mb-6 text-white">
//         Report New Issue
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-5">
//         {/* Issue Title */}
//         <div>
//           <label className="font-semibold text-black">Issue Title</label>
//           <input
//             type="text"
//             name="title"
//             required
//             className="w-full rounded-xl border-2 border-[#FFD700] bg-white/10 px-4 py-2 text-white placeholder-white/70 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all duration-200"
//             placeholder="Enter issue title"
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label className="font-semibold text-black">Category</label>
//           <select
//             name="category"
//             required
//             defaultValue=""
//             className="w-full rounded-xl border-2 border-[#FFD700] bg-white/10 px-4 py-2 text-white placeholder-white/70 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all duration-200"
//           >
//             <option value="" disabled>
//               Select category
//             </option>
//             <option value="Cleanliness" className="text-black">
//               Garbage
//             </option>
//             <option value="Public Space" className="text-black">
//               Illegal Construction
//             </option>
//             <option value="Garbage Management" className="text-black">
//               Broken Public Property
//             </option>
//             <option value="Road Damager" className="text-black">
//               Road Damage
//             </option>
//           </select>
//         </div>

//         {/* Location */}
//         <div>
//           <label className="font-semibold text-black">Location</label>
//           <input
//             type="text"
//             name="location"
//             required
//             className="w-full rounded-xl border-2 border-[#FFD700] bg-white/10 px-4 py-2 text-white placeholder-white/70 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all duration-200"
//             placeholder="Enter location"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="font-semibold text-black">Description</label>
//           <textarea
//             name="description"
//             required
//             rows="4"
//             className="w-full rounded-2xl border-2 border-[#FFD700] bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none resize-none transition-all duration-200"
//             placeholder="Describe the issue"
//           ></textarea>
//         </div>

//         {/* Image URL */}
//         <div>
//           <label className="font-semibold text-black">Image URL</label>
//           <input
//             type="url"
//             name="image"
//             className="w-full rounded-xl border-2 border-[#FFD700] bg-white/10 px-4 py-2 text-white placeholder-white/70 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all duration-200"
//             placeholder="https://example.com/image.jpg"
//           />
//         </div>

//         {/* Suggested Budget */}
//         <div>
//           <label className="font-semibold text-black">
//             Suggested Fix Budget
//           </label>
//           <input
//             type="number"
//             name="amount"
//             required
//             className="w-full rounded-xl border-2 border-[#FFD700] bg-white/10 px-4 py-2 text-white placeholder-white/70 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all duration-200"
//             placeholder="Enter amount"
//           />
//         </div>

//         {/* User Email */}
//         <div>
//           <label className="font-semibold text-black">Your Email</label>
//           <input
//             type="email"
//             value={user.email}
//             readOnly
//             className="w-full rounded-xl border-2 border-[#FFD700] bg-white/20 px-4 py-2 text-white cursor-not-allowed"
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="mt-4">
//           <button
//             type="submit"
//             className="flex items-center justify-center gap-2 border border-[#FFD700] bg-[#2E8B57] text-white px-4 py-2 rounded-full hover:bg-[#FFD700] hover:text-[#2E8B57] transition duration-300 font-semibold"
//           >
//             Submit Issue <FiArrowRight />
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddIssue;
import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthContext';
import { FiArrowRight } from 'react-icons/fi';
import { Helmet } from 'react-helmet';

const AddIssue = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      // ১️⃣ প্রথমে MyIssues এ পাঠাও
      const res1 = await fetch('http://localhost:3000/myissue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res1.ok) throw new Error('Failed to add issue in MyIssues');

      // ২️⃣ তারপর Main Issue কালেকশনেও পাঠাও
      const res2 = await fetch('http://localhost:3000/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res2.ok) throw new Error('Failed to add issue in All Issues');

      toast.success('Issue added successfully in both collections!');
      e.target.reset();
    } catch (err) {
      console.error(err);
      toast.error('Failed to add issue. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 mb-1 rounded-xl overflow-hidden border border-[#FFD700]/70 shadow-xl bg-gradient-to-br from-[#2E8B57]/90 via-[#3CB371]/80 to-[#90EE90]/70 p-6 mb-7">
      <Helmet>
        <title>Addissue | Community Cleanliness</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        Report New Issue
      </h2>

      {/* 🔔 Toaster for React Hot Toast */}
      <Toaster position="top-right" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Issue Title */}
        <div>
          <label className="font-semibold text-black">Issue Title</label>
          <input
            type="text"
            name="title"
            required
            className="w-full rounded-xl border-2 border-[#FFD700] bg-white/10 px-4 py-2 text-white placeholder-white/70 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all duration-200"
            placeholder="Enter issue title"
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold text-black">Category</label>
          <select
            name="category"
            required
            defaultValue=""
            className="w-full rounded-xl border-2 border-[#FFD700] bg-white/10 px-4 py-2 text-white placeholder-white/70 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all duration-200"
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="Cleanliness" className="text-black">
              Garbage
            </option>
            <option value="Public Space" className="text-black">
              Illegal Construction
            </option>
            <option value="Garbage Management" className="text-black">
              Broken Public Property
            </option>
            <option value="Road Damager" className="text-black">
              Road Damage
            </option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="font-semibold text-black">Location</label>
          <input
            type="text"
            name="location"
            required
            className="w-full rounded-xl border-2 border-[#FFD700] bg-white/10 px-4 py-2 text-white placeholder-white/70 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all duration-200"
            placeholder="Enter location"
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold text-black">Description</label>
          <textarea
            name="description"
            required
            rows="4"
            className="w-full rounded-2xl border-2 border-[#FFD700] bg-white/10 px-4 py-3 text-white placeholder-white/70 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none resize-none transition-all duration-200"
            placeholder="Describe the issue"
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="font-semibold text-black">Image URL</label>
          <input
            type="url"
            name="image"
            className="w-full rounded-xl border-2 border-[#FFD700] bg-white/10 px-4 py-2 text-white placeholder-white/70 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all duration-200"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Suggested Budget */}
        <div>
          <label className="font-semibold text-black">
            Suggested Fix Budget
          </label>
          <input
            type="number"
            name="amount"
            required
            className="w-full rounded-xl border-2 border-[#FFD700] bg-white/10 px-4 py-2 text-white placeholder-white/70 focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] outline-none transition-all duration-200"
            placeholder="Enter amount"
          />
        </div>

        {/* User Email */}
        <div>
          <label className="font-semibold text-black">Your Email</label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full rounded-xl border-2 border-[#FFD700] bg-white/20 px-4 py-2 text-white cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 border border-[#FFD700] bg-[#2E8B57] text-white px-4 py-2 rounded-full hover:bg-[#FFD700] hover:text-[#2E8B57] transition duration-300 font-semibold"
          >
            Submit Issue <FiArrowRight />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddIssue;
