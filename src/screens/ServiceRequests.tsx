import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ServiceRequests: React.FC = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const activeRequests = [
    { issue: 'Low range', status: 'Technician Assigned', id: 'SR1024', created: '2 days ago' }
  ];

  const pastRequests = [
    { issue: 'Charging issue', status: 'Resolved', id: 'SR0911', resolved: 'Jan 2026' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (showForm) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white border-b border-gray-100 p-4 flex items-center gap-3">
          <button onClick={() => setShowForm(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <BackIcon />
          </button>
          <h1 className="text-lg font-bold text-gray-900">New Request</h1>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Issue Type</label>
              <select className="w-full bg-gray-50 border border-gray-200 text-sm py-3 px-3 rounded-xl outline-none focus:border-green-500 transition-colors">
                <option>Charging Issue</option>
                <option>Low Range</option>
                <option>Battery Error</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea 
                rows={4}
                placeholder="Can you describe the issue in detail?" 
                className="w-full bg-gray-50 border border-gray-200 text-sm py-3 px-3 rounded-xl outline-none focus:border-green-500 transition-colors resize-none"
              />
            </div>
            <button className="w-full bg-green-600 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-green-700 active:scale-[0.98] transition-all shadow-lg shadow-green-600/20">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <BackIcon />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Service Requests</h1>
      </div>

      <div className="p-4 space-y-5 pb-6">
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl flex gap-3 items-start animate-fade-in">
            <span className="text-xl">✅</span>
            <div>
              <p className="text-sm font-bold text-green-800">Request submitted</p>
              <p className="text-[10px] text-green-700 mt-0.5">Our technician will contact you soon.</p>
            </div>
          </div>
        )}

        {/* Active Requests */}
        <div className="space-y-3">
          <h2 className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-1">Active Requests</h2>
          {activeRequests.map((req) => (
            <div key={req.id} className="bg-white rounded-2xl p-4 shadow-sm border border-orange-100">
              <div className="flex justify-between items-start mb-2">
                <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                  {req.status}
                </div>
                <span className="text-xs text-gray-400 font-medium">Created {req.created}</span>
              </div>
              <h3 className="text-base font-bold text-gray-900">{req.issue}</h3>
              <p className="text-xs text-gray-500 mt-1">Ticket ID: {req.id}</p>
            </div>
          ))}
        </div>

        {/* Past Requests */}
        <div className="space-y-3">
          <h2 className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-1">Past Requests</h2>
          {pastRequests.map((req) => (
            <div key={req.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 opacity-75">
              <div className="flex justify-between items-start mb-2">
                <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                  Resolved
                </div>
                <span className="text-xs text-gray-400 font-medium">Closed {req.resolved}</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900">{req.issue}</h3>
              <p className="text-[10px] text-gray-500 mt-1">Ticket ID: {req.id}</p>
            </div>
          ))}
        </div>

        <button 
          onClick={() => setShowForm(true)}
          className="w-full bg-white text-green-700 font-bold text-sm py-3.5 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all"
        >
          Create Service Request
        </button>
      </div>
    </div>
  );
};

export default ServiceRequests;
