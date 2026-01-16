
import React, { useContext, useState, useMemo } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { Helmet } from 'react-helmet';
import { FiDownload, FiFileText, FiCalendar, FiDollarSign, FiUser, FiMail, FiPhone, FiSearch, FiBarChart2, FiPieChart, FiTrendingUp } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const MyContribution = () => {
  const contribution = useLoaderData(); 
  const { user } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [activeChartView, setActiveChartView] = useState('overview'); // 'overview', 'monthly', 'distribution', 'growth'

  const myContributions = contribution.filter(
    (item) => item.email === user?.email
  );

  // Filter and sort contributions
  const filteredContributions = myContributions
    .filter(item => 
      item.issueTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contributorName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy] || '';
      let bValue = b[sortBy] || '';
      
      if (sortBy === 'amount') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      }
      
      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const totalAmount = myContributions.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  // Chart data processing
  const chartData = useMemo(() => {
    // Group contributions by month for time-based charts
    const monthlyData = myContributions.reduce((acc, item) => {
      const date = new Date(item.date || Date.now());
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      
      if (!acc[monthKey]) {
        acc[monthKey] = { label: monthLabel, amount: 0, count: 0 };
      }
      acc[monthKey].amount += parseFloat(item.amount) || 0;
      acc[monthKey].count += 1;
      return acc;
    }, {});

    const sortedMonths = Object.keys(monthlyData).sort();
    const monthlyAmounts = sortedMonths.map(key => monthlyData[key].amount);
    const monthlyLabels = sortedMonths.map(key => monthlyData[key].label);
    const monthlyCounts = sortedMonths.map(key => monthlyData[key].count);

    // Cumulative data for line chart
    const cumulativeAmounts = monthlyAmounts.reduce((acc, amount, index) => {
      acc.push((acc[index - 1] || 0) + amount);
      return acc;
    }, []);

    // Issue-based data for pie chart
    const issueData = myContributions.reduce((acc, item) => {
      const issueTitle = item.issueTitle || 'Unknown Issue';
      if (!acc[issueTitle]) {
        acc[issueTitle] = 0;
      }
      acc[issueTitle] += parseFloat(item.amount) || 0;
      return acc;
    }, {});

    const pieLabels = Object.keys(issueData);
    const pieAmounts = Object.values(issueData);

    return {
      monthly: {
        labels: monthlyLabels,
        amounts: monthlyAmounts,
        counts: monthlyCounts,
        cumulative: cumulativeAmounts
      },
      issues: {
        labels: pieLabels,
        amounts: pieAmounts
      }
    };
  }, [myContributions]);

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

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor(46, 139, 87);
      doc.text('My Contributions Report', 14, 22);
      
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 32);
      doc.text(`Total Contributions: ${myContributions.length}`, 14, 40);
      doc.text(`Total Amount: $${totalAmount.toFixed(2)}`, 14, 48);

      const tableColumn = [
        'Issue Title',
        'Contributor',
        'Email',
        'Phone',
        'Amount ($)',
        'Date',
      ];
      
      const tableRows = filteredContributions.map((item) => [
        item.issueTitle || 'Unknown Issue',
        item.contributorName || 'Anonymous',
        item.email || 'N/A',
        item.phone || 'N/A',
        `${parseFloat(item.amount || 0).toFixed(2)}`,
        item.date ? new Date(item.date).toLocaleDateString() : 'N/A',
      ]);

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 58,
        theme: 'grid',
        headStyles: { 
          fillColor: [46, 139, 87],
          textColor: [255, 255, 255],
          fontSize: 10,
          fontStyle: 'bold'
        },
        styles: { 
          fontSize: 9,
          cellPadding: 3
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        }
      });

      doc.save(`My_Contributions_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      toast.success('PDF report downloaded successfully!');
    } catch (error) {
      console.error('PDF download failed:', error);
      toast.error('Failed to download PDF report');
    }
  };

  const handleDownloadExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(
        filteredContributions.map(item => ({
          'Issue Title': item.issueTitle || 'Unknown Issue',
          'Contributor Name': item.contributorName || 'Anonymous',
          'Email': item.email || 'N/A',
          'Phone': item.phone || 'N/A',
          'Amount': parseFloat(item.amount || 0).toFixed(2),
          'Date': item.date ? new Date(item.date).toLocaleDateString() : 'N/A'
        }))
      );
      
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'My Contributions');
      
      XLSX.writeFile(workbook, `My_Contributions_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success('Excel report downloaded successfully!');
    } catch (error) {
      console.error('Excel download failed:', error);
      toast.error('Failed to download Excel report');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
      <Helmet>
        <title>My Contributions | Community Cleanliness Dashboard</title>
      </Helmet>

      <ToastContainer autoClose={3000} theme="colored" />

      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-color)' }}>
          My Contributions
        </h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
          Track and manage all your community contributions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="rounded-xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 transition-all duration-300" style={{ backgroundColor: 'var(--bg-color)' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <FiFileText size={20} className="text-green-600 dark:text-green-400 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
                {myContributions.length}
              </h3>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                Total Contributions
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300" style={{ backgroundColor: 'var(--bg-color)' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <FiDollarSign size={20} className="text-blue-600 dark:text-blue-400 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-color)' }}>
                {formatBudget(totalAmount)}
              </h3>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                Total Amount
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 sm:col-span-2 lg:col-span-1" style={{ backgroundColor: 'var(--bg-color)' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FiCalendar size={20} className="text-purple-600 dark:text-purple-400 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-2xl font-bold truncate" style={{ color: 'var(--text-color)' }}>
                {myContributions.length > 0 ? new Date(Math.max(...myContributions.map(c => new Date(c.date || 0)))).toLocaleDateString() : 'N/A'}
              </h3>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                Latest Contribution
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Insights */}
      {myContributions.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-lg p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 border border-blue-200 dark:border-blue-700">
              <div className="flex items-center gap-2 mb-2">
                <FiTrendingUp className="text-blue-600 dark:text-blue-400" size={16} />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Average/Month</span>
              </div>
              <div className="text-lg font-bold text-blue-800 dark:text-blue-200">
                ${chartData.monthly.amounts.length > 0 ? (totalAmount / chartData.monthly.amounts.length).toFixed(2) : '0.00'}
              </div>
            </div>
            
            <div className="rounded-lg p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 border border-green-200 dark:border-green-700">
              <div className="flex items-center gap-2 mb-2">
                <FiDollarSign className="text-green-600 dark:text-green-400" size={16} />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">Highest Month</span>
              </div>
              <div className="text-lg font-bold text-green-800 dark:text-green-200">
                ${Math.max(...chartData.monthly.amounts, 0).toFixed(2)}
              </div>
            </div>
            
            <div className="rounded-lg p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 border border-purple-200 dark:border-purple-700">
              <div className="flex items-center gap-2 mb-2">
                <FiFileText className="text-purple-600 dark:text-purple-400" size={16} />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Top Issue</span>
              </div>
              <div className="text-lg font-bold text-purple-800 dark:text-purple-200 truncate">
                {chartData.issues.amounts.length > 0 ? 
                  chartData.issues.labels[chartData.issues.amounts.indexOf(Math.max(...chartData.issues.amounts))].substring(0, 15) + '...' : 
                  'N/A'
                }
              </div>
            </div>
            
            <div className="rounded-lg p-4 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 border border-orange-200 dark:border-orange-700">
              <div className="flex items-center gap-2 mb-2">
                <FiCalendar className="text-orange-600 dark:text-orange-400" size={16} />
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Active Months</span>
              </div>
              <div className="text-lg font-bold text-orange-800 dark:text-orange-200">
                {chartData.monthly.labels.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts Section */}
      {myContributions.length > 0 && (
        <div className="mb-6 sm:mb-8">
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--text-color)' }}>
                  Contribution Analytics
                </h2>
                <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
                  Visual insights into your contribution patterns
                </p>
              </div>
              
              {/* Chart View Toggle */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveChartView('overview')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeChartView === 'overview'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveChartView('monthly')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeChartView === 'monthly'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setActiveChartView('distribution')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeChartView === 'distribution'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  Distribution
                </button>
                <button
                  onClick={() => setActiveChartView('growth')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeChartView === 'growth'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                  style={{ cursor: 'pointer' }}
                >
                  Growth
                </button>
              </div>
            </div>
          </div>

          {/* Overview - All Charts */}
          {activeChartView === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {/* Monthly Contributions Bar Chart */}
              <div className="lg:col-span-2 xl:col-span-2 rounded-xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--bg-color)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <FiBarChart2 className="text-blue-600 dark:text-blue-400" size={20} />
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>
                    Monthly Contributions
                  </h3>
                </div>
                <div className="h-64 sm:h-80">
                  <Bar
                    data={{
                      labels: chartData.monthly.labels,
                      datasets: [
                        {
                          label: 'Amount ($)',
                          data: chartData.monthly.amounts,
                          backgroundColor: 'rgba(59, 130, 246, 0.6)',
                          borderColor: 'rgba(59, 130, 246, 1)',
                          borderWidth: 2,
                          borderRadius: 6,
                          borderSkipped: false,
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: 'var(--text-color)',
                            font: { size: 12 }
                          }
                        },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          titleColor: 'white',
                          bodyColor: 'white',
                          callbacks: {
                            label: function(context) {
                              return `Amount: $${context.parsed.y.toFixed(2)}`;
                            }
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            color: 'var(--text-secondary)',
                            callback: function(value) {
                              return '$' + value.toFixed(0);
                            }
                          },
                          grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                          }
                        },
                        x: {
                          ticks: {
                            color: 'var(--text-secondary)',
                            maxRotation: 45
                          },
                          grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Contribution Distribution Pie Chart */}
              <div className="rounded-xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--bg-color)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <FiPieChart className="text-green-600 dark:text-green-400" size={20} />
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>
                    By Issue Type
                  </h3>
                </div>
                <div className="h-64 sm:h-80">
                  <Pie
                    data={{
                      labels: chartData.issues.labels.map(label => 
                        label.length > 20 ? label.substring(0, 20) + '...' : label
                      ),
                      datasets: [
                        {
                          data: chartData.issues.amounts,
                          backgroundColor: [
                            'rgba(239, 68, 68, 0.8)',
                            'rgba(34, 197, 94, 0.8)',
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(168, 85, 247, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(236, 72, 153, 0.8)',
                            'rgba(20, 184, 166, 0.8)',
                            'rgba(156, 163, 175, 0.8)'
                          ],
                          borderColor: [
                            'rgba(239, 68, 68, 1)',
                            'rgba(34, 197, 94, 1)',
                            'rgba(59, 130, 246, 1)',
                            'rgba(168, 85, 247, 1)',
                            'rgba(245, 158, 11, 1)',
                            'rgba(236, 72, 153, 1)',
                            'rgba(20, 184, 166, 1)',
                            'rgba(156, 163, 175, 1)'
                          ],
                          borderWidth: 2
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            color: 'var(--text-color)',
                            font: { size: 10 },
                            padding: 10,
                            usePointStyle: true
                          }
                        },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          titleColor: 'white',
                          bodyColor: 'white',
                          callbacks: {
                            label: function(context) {
                              const total = context.dataset.data.reduce((a, b) => a + b, 0);
                              const percentage = ((context.parsed / total) * 100).toFixed(1);
                              return `${context.label}: $${context.parsed.toFixed(2)} (${percentage}%)`;
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Cumulative Contributions Line Chart */}
              <div className="lg:col-span-2 xl:col-span-3 rounded-xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--bg-color)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <FiTrendingUp className="text-purple-600 dark:text-purple-400" size={20} />
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>
                    Cumulative Contribution Growth
                  </h3>
                </div>
                <div className="h-64 sm:h-80">
                  <Line
                    data={{
                      labels: chartData.monthly.labels,
                      datasets: [
                        {
                          label: 'Cumulative Amount ($)',
                          data: chartData.monthly.cumulative,
                          borderColor: 'rgba(168, 85, 247, 1)',
                          backgroundColor: 'rgba(168, 85, 247, 0.1)',
                          borderWidth: 3,
                          fill: true,
                          tension: 0.4,
                          pointBackgroundColor: 'rgba(168, 85, 247, 1)',
                          pointBorderColor: 'white',
                          pointBorderWidth: 2,
                          pointRadius: 6,
                          pointHoverRadius: 8
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: 'var(--text-color)',
                            font: { size: 12 }
                          }
                        },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          titleColor: 'white',
                          bodyColor: 'white',
                          callbacks: {
                            label: function(context) {
                              return `Total: $${context.parsed.y.toFixed(2)}`;
                            }
                          }
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          ticks: {
                            color: 'var(--text-secondary)',
                            callback: function(value) {
                              return '$' + value.toFixed(0);
                            }
                          },
                          grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                          }
                        },
                        x: {
                          ticks: {
                            color: 'var(--text-secondary)',
                            maxRotation: 45
                          },
                          grid: {
                            color: 'rgba(156, 163, 175, 0.2)'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Monthly View - Full Width Bar Chart */}
          {activeChartView === 'monthly' && (
            <div className="rounded-xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--bg-color)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FiBarChart2 className="text-blue-600 dark:text-blue-400" size={24} />
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--text-color)' }}>
                    Monthly Contribution Analysis
                  </h3>
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Total: ${totalAmount.toFixed(2)}
                </div>
              </div>
              <div className="h-96">
                <Bar
                  data={{
                    labels: chartData.monthly.labels,
                    datasets: [
                      {
                        label: 'Amount ($)',
                        data: chartData.monthly.amounts,
                        backgroundColor: 'rgba(59, 130, 246, 0.6)',
                        borderColor: 'rgba(59, 130, 246, 1)',
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false,
                      },
                      {
                        label: 'Count',
                        data: chartData.monthly.counts,
                        backgroundColor: 'rgba(34, 197, 94, 0.6)',
                        borderColor: 'rgba(34, 197, 94, 1)',
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false,
                        yAxisID: 'y1',
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                      mode: 'index',
                      intersect: false,
                    },
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: {
                          color: 'var(--text-color)',
                          font: { size: 14 }
                        }
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        callbacks: {
                          label: function(context) {
                            if (context.datasetIndex === 0) {
                              return `Amount: $${context.parsed.y.toFixed(2)}`;
                            } else {
                              return `Contributions: ${context.parsed.y}`;
                            }
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        beginAtZero: true,
                        ticks: {
                          color: 'var(--text-secondary)',
                          callback: function(value) {
                            return '$' + value.toFixed(0);
                          }
                        },
                        grid: {
                          color: 'rgba(156, 163, 175, 0.2)'
                        }
                      },
                      y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        beginAtZero: true,
                        ticks: {
                          color: 'var(--text-secondary)',
                        },
                        grid: {
                          drawOnChartArea: false,
                        },
                      },
                      x: {
                        ticks: {
                          color: 'var(--text-secondary)',
                          maxRotation: 45
                        },
                        grid: {
                          color: 'rgba(156, 163, 175, 0.2)'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Distribution View - Full Width Pie Chart */}
          {activeChartView === 'distribution' && (
            <div className="rounded-xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--bg-color)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FiPieChart className="text-green-600 dark:text-green-400" size={24} />
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--text-color)' }}>
                    Contribution Distribution by Issue Type
                  </h3>
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {chartData.issues.labels.length} Issue Types
                </div>
              </div>
              <div className="h-96">
                <Pie
                  data={{
                    labels: chartData.issues.labels,
                    datasets: [
                      {
                        data: chartData.issues.amounts,
                        backgroundColor: [
                          'rgba(239, 68, 68, 0.8)',
                          'rgba(34, 197, 94, 0.8)',
                          'rgba(59, 130, 246, 0.8)',
                          'rgba(168, 85, 247, 0.8)',
                          'rgba(245, 158, 11, 0.8)',
                          'rgba(236, 72, 153, 0.8)',
                          'rgba(20, 184, 166, 0.8)',
                          'rgba(156, 163, 175, 0.8)',
                          'rgba(99, 102, 241, 0.8)',
                          'rgba(139, 69, 19, 0.8)'
                        ],
                        borderColor: [
                          'rgba(239, 68, 68, 1)',
                          'rgba(34, 197, 94, 1)',
                          'rgba(59, 130, 246, 1)',
                          'rgba(168, 85, 247, 1)',
                          'rgba(245, 158, 11, 1)',
                          'rgba(236, 72, 153, 1)',
                          'rgba(20, 184, 166, 1)',
                          'rgba(156, 163, 175, 1)',
                          'rgba(99, 102, 241, 1)',
                          'rgba(139, 69, 19, 1)'
                        ],
                        borderWidth: 3
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: 'var(--text-color)',
                          font: { size: 12 },
                          padding: 15,
                          usePointStyle: true
                        }
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        callbacks: {
                          label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `${context.label}: $${context.parsed.toFixed(2)} (${percentage}%)`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}

          {/* Growth View - Full Width Line Chart */}
          {activeChartView === 'growth' && (
            <div className="rounded-xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700" style={{ backgroundColor: 'var(--bg-color)' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FiTrendingUp className="text-purple-600 dark:text-purple-400" size={24} />
                  <h3 className="text-xl font-semibold" style={{ color: 'var(--text-color)' }}>
                    Cumulative Contribution Growth Over Time
                  </h3>
                </div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Growth Rate: {chartData.monthly.cumulative.length > 1 ? 
                    ((chartData.monthly.cumulative[chartData.monthly.cumulative.length - 1] / chartData.monthly.cumulative[0] - 1) * 100).toFixed(1) + '%' : 
                    'N/A'
                  }
                </div>
              </div>
              <div className="h-96">
                <Line
                  data={{
                    labels: chartData.monthly.labels,
                    datasets: [
                      {
                        label: 'Cumulative Amount ($)',
                        data: chartData.monthly.cumulative,
                        borderColor: 'rgba(168, 85, 247, 1)',
                        backgroundColor: 'rgba(168, 85, 247, 0.1)',
                        borderWidth: 4,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: 'rgba(168, 85, 247, 1)',
                        pointBorderColor: 'white',
                        pointBorderWidth: 3,
                        pointRadius: 8,
                        pointHoverRadius: 10
                      },
                      {
                        label: 'Monthly Amount ($)',
                        data: chartData.monthly.amounts,
                        borderColor: 'rgba(59, 130, 246, 1)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderWidth: 3,
                        fill: false,
                        tension: 0.4,
                        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                        pointBorderColor: 'white',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8
                      }
                    ]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                      mode: 'index',
                      intersect: false,
                    },
                    plugins: {
                      legend: {
                        position: 'top',
                        labels: {
                          color: 'var(--text-color)',
                          font: { size: 14 }
                        }
                      },
                      tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: 'white',
                        bodyColor: 'white',
                        callbacks: {
                          label: function(context) {
                            if (context.datasetIndex === 0) {
                              return `Cumulative: $${context.parsed.y.toFixed(2)}`;
                            } else {
                              return `Monthly: $${context.parsed.y.toFixed(2)}`;
                            }
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          color: 'var(--text-secondary)',
                          callback: function(value) {
                            return '$' + value.toFixed(0);
                          }
                        },
                        grid: {
                          color: 'rgba(156, 163, 175, 0.2)'
                        }
                      },
                      x: {
                        ticks: {
                          color: 'var(--text-secondary)',
                          maxRotation: 45
                        },
                        grid: {
                          color: 'rgba(156, 163, 175, 0.2)'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search contributions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              />
            </div>

            {/* Sort Controls */}
            <div className="flex gap-2 flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
                <option value="issueTitle">Sort by Issue</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-bold"
                style={{ color: 'var(--text-color)' }}
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleDownloadPDF}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm font-medium"
            >
              <FiDownload size={16} />
              <span className="hidden xs:inline">PDF</span>
            </button>
            <button
              onClick={handleDownloadExcel}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm font-medium"
            >
              <FiDownload size={16} />
              <span className="hidden xs:inline">Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      {filteredContributions.length > 0 ? (
        <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden" style={{ backgroundColor: 'var(--bg-color)' }}>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Issue Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Contributor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredContributions.map((item, index) => (
                  <tr 
                    key={item._id || index}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FiFileText className="text-blue-600 dark:text-blue-400 flex-shrink-0" size={16} />
                        <span className="font-medium" style={{ color: 'var(--text-color)' }}>
                          {item.issueTitle || 'Unknown Issue'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FiUser className="text-green-600 dark:text-green-400 flex-shrink-0" size={16} />
                        <span style={{ color: 'var(--text-color)' }}>
                          {item.contributorName || 'Anonymous'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <FiMail className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={14} />
                          <span style={{ color: 'var(--text-secondary)' }} className="truncate">
                            {item.email || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <FiPhone className="text-orange-600 dark:text-orange-400 flex-shrink-0" size={14} />
                          <span style={{ color: 'var(--text-secondary)' }}>
                            {item.phone || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FiDollarSign className="text-green-600 dark:text-green-400 flex-shrink-0" size={16} />
                        <span className="font-semibold text-green-600 dark:text-green-400">
                          ${parseFloat(item.amount || 0).toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="text-gray-600 dark:text-gray-400 flex-shrink-0" size={16} />
                        <span style={{ color: 'var(--text-secondary)' }} className="text-sm">
                          {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden">
            <div className="space-y-4 p-4">
              {filteredContributions.map((item, index) => (
                <div 
                  key={item._id || index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  style={{ backgroundColor: 'var(--bg-color)' }}
                >
                  {/* Issue Title */}
                  <div className="flex items-start gap-2 mb-3">
                    <FiFileText className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={16} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base leading-tight" style={{ color: 'var(--text-color)' }}>
                        {item.issueTitle || 'Unknown Issue'}
                      </h3>
                    </div>
                  </div>

                  {/* Contributor */}
                  <div className="flex items-center gap-2 mb-2">
                    <FiUser className="text-green-600 dark:text-green-400 flex-shrink-0" size={14} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>
                      {item.contributorName || 'Anonymous'}
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2">
                      <FiMail className="text-purple-600 dark:text-purple-400 flex-shrink-0" size={12} />
                      <span className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>
                        {item.email || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiPhone className="text-orange-600 dark:text-orange-400 flex-shrink-0" size={12} />
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {item.phone || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Amount and Date */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <FiDollarSign className="text-green-600 dark:text-green-400 flex-shrink-0" size={14} />
                      <span className="font-semibold text-green-600 dark:text-green-400 text-sm">
                        ${parseFloat(item.amount || 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-gray-600 dark:text-gray-400 flex-shrink-0" size={12} />
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                        {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700" style={{ backgroundColor: 'var(--bg-color)' }}>
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FiFileText size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
            No Contributions Found
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            {searchTerm ? 'No contributions match your search criteria.' : 'You haven\'t made any contributions yet.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default MyContribution;
