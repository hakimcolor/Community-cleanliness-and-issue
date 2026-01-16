
import React, { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import ALLCARD from './ALLCARD';
import { Helmet } from 'react-helmet';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { Search } from 'lucide-react';

const AllIssues = () => {
  const allissue = useLoaderData(); // সব ডাটা
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting & Search state
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter & sort issues
  const filteredIssues = useMemo(() => {
    let data = [...allissue];

    // Filter by title
    if (searchTerm) {
      data = data.filter((issue) =>
        issue.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    if (sortOption === 'amount-asc') {
      data.sort((a, b) => a.amount - b.amount);
    } else if (sortOption === 'amount-desc') {
      data.sort((a, b) => b.amount - a.amount);
    } else if (sortOption === 'title-asc') {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'title-desc') {
      data.sort((a, b) => b.title.localeCompare(a.title));
    }

    return data;
  }, [allissue, sortOption, searchTerm]);

  const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredIssues.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-8 mt-16" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-[1400px] mx-auto px-4">
        <Helmet>
          <title>All Issues | Community Cleanliness</title>
        </Helmet>

        <h2 className="text-3xl font-semibold text-center mb-6" style={{ color: 'var(--text-color)' }}>
          All Issues
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-1/3">
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-blue-600" />
            </div>

            {/* Input Field */}
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-10 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-all duration-300"
            />
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="" className="text-gray-900 dark:text-white">
              Sort By
            </option>
            <option className="text-gray-900 dark:text-white" value="amount-asc">
              Amount: Low to High
            </option>
            <option className="text-gray-900 dark:text-white" value="amount-desc">
              Amount: High to Low
            </option>
            <option className="text-gray-900 dark:text-white" value="title-asc">
              Title: A-Z
            </option>
            <option className="text-gray-900 dark:text-white" value="title-desc">
              Title: Z-A
            </option>
          </select>
        </div>

        <ALLCARD allissues={currentItems} />

        {/* Pagination with icons */}
        <div className="flex justify-center items-center mt-6 mb-10 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-full border-2 transition-all duration-300 ${
              currentPage === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed border-gray-300 dark:border-gray-600'
                : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 transform hover:scale-105'
            }`}
          >
            <HiChevronLeft size={24} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full border-2 transition-all duration-300 ${
              currentPage === totalPages
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed border-gray-300 dark:border-gray-600'
                : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:border-blue-700 transform hover:scale-105'
            }`}
          >
            <HiChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllIssues;
