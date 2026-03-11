import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const Support: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeIssue, setActiveIssue] = useState<string | null>(null);

  const issues = [
    { id: '1', title: t('support_issue_1_title'), desc: t('support_issue_1_desc'), videoId: 'dQw4w9WgXcQ' },
    { id: '2', title: t('support_issue_2_title'), desc: t('support_issue_2_desc'), videoId: 'K4TOrB7at0Y' },
    { id: '3', title: t('support_issue_3_title'), desc: t('support_issue_3_desc') },
    { id: '4', title: t('support_issue_4_title'), desc: t('support_issue_4_desc') },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <BackIcon />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{t('support_title')}</h1>
      </div>

      <div className="p-4 space-y-4 pb-6">
        {/* Contact Support Card */}
        <div className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-400 rounded-2xl p-5 shadow-sm text-white">
          <h2 className="text-xl font-extrabold mb-2">{t('support_need_help')}</h2>
          <p className="text-sm text-green-50 mb-4">{t('support_timing')}</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-white text-green-700 font-bold text-sm py-3 rounded-xl hover:bg-green-50 transition-colors shadow-sm">
              {t('support_call')}
            </button>
            <button className="flex-1 bg-green-700 text-white font-bold text-sm py-3 rounded-xl hover:bg-green-800 transition-colors shadow-sm">
              {t('support_chat')}
            </button>
          </div>
        </div>

        {/* Knowledge Repo / Video Guides */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-5 pt-4 pb-1">{t('support_video_guides')}</p>
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
