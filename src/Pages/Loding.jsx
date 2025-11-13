// src/Pages/Loading.jsx
import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="text-center">
        <div className="loader mb-4"></div>
        <p className="text-gray-700 font-semibold">Loading, please wait...</p>
      </div>

      <style jsx>{`
        .loader {
          border: 6px solid #f3f3f3;
          border-top: 6px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
