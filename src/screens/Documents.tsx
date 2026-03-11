import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const Documents: React.FC = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'KYC Documents',
      docs: [{ name: 'Aadhar Card', date: 'Jan 15, 2026' }],
    },
    {
      title: 'Agreement',
      docs: [{ name: 'Loan Agreement', date: 'Jan 18, 2026' }],
    },
    {
      title: 'Invoices',
      docs: [{ name: 'Purchase Invoice', date: 'Jan 20, 2026' }],
    },
    {
      title: 'Warranty',
      docs: [{ name: 'Battery Warranty Certificate', date: 'Jan 20, 2026' }],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <BackIcon />
        </button>
        <h1 className="text-lg font-bold text-gray-900">My Documents</h1>
      </div>

      <div className="p-4 space-y-4 pb-6">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-5 pt-4 mb-2">{section.title}</p>
            <div className="divide-y divide-gray-50">
              {section.docs.map((doc, i) => (
                <div key={i} className="p-4 px-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 shrink-0 border border-gray-100">
                      <FileIcon />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{doc.name}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Uploaded {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gray-50 text-gray-700 font-semibold text-xs py-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                      View
                    </button>
                    <button className="flex-1 bg-green-50 text-green-700 font-semibold text-xs py-2 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
