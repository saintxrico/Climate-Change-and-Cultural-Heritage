import React from 'react';

const ReportCard = ({ report }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-lg font-bold">{report.title}</h3>
      <p>{report.description}</p>
      <p>Type: {report.type}</p>
      <p>Status: {report.status}</p>
      {report.imageUrl && <img src={report.imageUrl} alt="Report" className="w-full h-32 object-cover" />}
    </div>
  );
};

export default ReportCard;