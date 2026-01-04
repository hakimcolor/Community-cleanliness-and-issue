
import React, { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
import ALLCARD from './ALLCARD';
import { Helmet } from 'react-helmet';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

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
    <div className="max-w-[1400px] mx-auto px-4 mt-20">
      <Helmet>
        <title>All Issues | Community Cleanliness</title>
      </Helmet>

      <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600 dark:text-blue-400">
        All Issues
      </h2>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/3 focus:outline-none focus:ring focus:border-blue-400"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border rounded w-full md:w-1/4 focus:outline-none focus:ring focus:border-blue-400"
        >
          <option value="" className="text-black cursor-pointer">
            Sort By
          </option>
          <option className="text-black cursor-pointer" value="amount-asc">
            Amount: Low to High
          </option>
          <option className="text-black cursor-pointer" value="amount-desc">
            Amount: High to Low
          </option>
          <option className="text-black cursor-pointer" value="title-asc">
            Title: A-Z
          </option>
          <option className="text-black cursor-pointer" value="title-desc">
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
          className={`p-2 rounded-full border transition ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
          }`}
        >
          <HiChevronLeft size={24} />
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded border ${
              currentPage === i + 1
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
            } transition`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full border transition ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
          }`}
        >
          <HiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default AllIssues;
