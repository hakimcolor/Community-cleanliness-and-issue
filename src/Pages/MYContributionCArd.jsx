
import React from 'react';
import { Helmet } from 'react-helmet';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const MYContributionCArd = ({ contribution }) => {
  const contributions = Array.isArray(contribution)
    ? contribution
    : [contribution];

 const handleDownloadPDF = () => {
   try {
     const doc = new jsPDF();

     doc.setFontSize(18);
     doc.text('My Contributions Report', 14, 22);

     const tableColumn = [
       'Issue Title',
       'Contributor',
       'Email',
       'Phone',
       'Amount',
       'Date',
     ];
     const tableRows = contributions.map((item) => [
       item.issueTitle || 'Unknown Issue',
       item.contributorName || 'Anonymous',
       item.email || 'N/A',
       item.phone || 'N/A',
       `$${item.amount || 0}`,
       item.date || 'N/A',
     ]);

     doc.autoTable({
       head: [tableColumn],
       body: tableRows,
       startY: 30,
       theme: 'grid',
       headStyles: { fillColor: [46, 139, 87] },
       styles: { fontSize: 10 },
     });

 
     doc.save('My_Contributions_Report.pdf');
     console.log('PDF download triggered'); 
   } catch (error) {
     console.error('PDF download failed:', error);
   }
 };

  return (
    <div className="px-4 sm:px-6 relative">
   
        <title>My Contribution | Community Cleanliness</title>
 

    
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 mt-23 bg-[#2E8B57] text-white rounded-lg shadow-lg hover:bg-[#3CB371] transition"
        >
          Download Report
        </button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-6 pb-10 mt-16">
        {contributions.map((item, index) => (
          <div
            key={item._id || index}
            className="rounded-xl shadow-md overflow-hidden border border-[#FFD700]/70 
                       hover:shadow-xl transition-all duration-300 flex flex-col h-full
                       bg-gradient-to-br from-[#2E8B57]/90 via-[#3CB371]/80 to-[#90EE90]/70 text-white"
          >
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                {item.issueTitle || 'Unknown Issue'}
              </h3>
              <p className="text-sm">
                <span className="font-medium text-[#FFD700]">Contributor:</span>{' '}
                {item.contributorName || 'Anonymous'}
              </p>
              <p className="text-sm">
                <span className="font-medium text-[#FFD700]">Email:</span>{' '}
                {item.email || 'N/A'}
              </p>
              <p className="text-sm">
                <span className="font-medium text-[#FFD700]">Phone:</span>{' '}
                {item.phone || 'N/A'}
              </p>
            </div>

            <div className="px-4 py-3 mt-auto border-t border-[#FFD700]/40 bg-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-[#FFD700] font-medium">Amount:</span>
                <span className="text-lg font-semibold text-black">
                  ${item.amount}
                </span>
              </div>
              <div className="text-xs text-black mt-1">
                Date: {item.date || 'N/A'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MYContributionCArd;
