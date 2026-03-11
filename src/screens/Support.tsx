import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const Support: React.FC = () => {
  const navigate = useNavigate();
  const [activeIssue, setActiveIssue] = useState<string | null>(null);

  const issues = [
    { id: '1', title: 'Battery not charging', desc: 'Ensure the charger is securely connected to the port. Check the wall socket switch. If the charger LED is red but battery not charging, please raise a service request.', videoId: 'dQw4w9WgXcQ' },
    { id: '2', title: 'Low range issue', desc: 'Range depends on riding style, payload, and tire pressure. Try riding in Eco mode for 2 days. If range continues to be low, raise a service request.', videoId: 'K4TOrB7at0Y' },
    { id: '3', title: 'Warranty question', desc: 'Your Pointo battery comes with a 4-year comprehensive warranty. It covers cell degradation below 70% and manufacturing defects.' },
    { id: '4', title: 'EMI payment issue', desc: 'If your EMI payment failed, you can retry via the Payment History page. Late payments may incur a nominal fee of ₹50.' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <BackIcon />
        </button>
        <h1 className="text-lg font-bold text-gray-900">Knowledge Base & Support</h1>
      </div>

      <div className="p-4 space-y-4 pb-6">
        {/* Contact Support Card */}
        <div className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-400 rounded-2xl p-5 shadow-sm text-white">
          <h2 className="text-xl font-extrabold mb-2">Need help with your battery?</h2>
          <p className="text-sm text-green-50 mb-4">Our support team is available Mon-Sat, 9AM to 7PM.</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-white text-green-700 font-bold text-sm py-3 rounded-xl hover:bg-green-50 transition-colors shadow-sm">
              Call Support
            </button>
            <button className="flex-1 bg-green-700 text-white font-bold text-sm py-3 rounded-xl hover:bg-green-800 transition-colors shadow-sm">
              Chat Support
            </button>
          </div>
        </div>

        {/* Knowledge Repo / Video Guides */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-5 pt-4 pb-1">Video Guides & Common Issues</p>
          <div className="divide-y divide-gray-50">
            {issues.map((issue) => (
              <div key={issue.id}>
                <button
                  onClick={() => setActiveIssue(activeIssue === issue.id ? null : issue.id)}
                  className="w-full p-4 px-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="text-sm font-semibold text-gray-800">{issue.title}</span>
                  <svg 
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`text-gray-400 transition-transform ${activeIssue === issue.id ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {activeIssue === issue.id && (
                  <div className="px-5 pb-4 text-xs tracking-wide leading-relaxed text-gray-500 bg-gray-50 border-t border-gray-50 pt-3">
                    <p>{issue.desc}</p>
                    {issue.videoId && (
                      <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 bg-black aspect-video relative">
                        <iframe 
                          className="absolute inset-0 w-full h-full"
                          src={`https://www.youtube.com/embed/${issue.videoId}`} 
                          title="YouTube video guide" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen 
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
