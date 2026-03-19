import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

const ChargerDetailsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { t } = useLanguage();

  if (!user || !user.charger) return null;
  const { charger } = user;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-100">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full active:scale-95 transition-transform"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">{charger.model}</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-0.5">{charger.brand}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Main Details Card */}
        <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100/50 rounded-full blur-2xl" />
          
          <div className="relative z-10 space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-1">Asset Status</p>
                <span className="bg-white text-green-600 text-[10px] font-black px-3 py-1 rounded-full border border-green-100 uppercase">
                  {charger.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-blue-100">🔌</div>
            </div>

            <div className="grid grid-cols-2 gap-y-5 gap-x-4 pt-2">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Type</p>
                <p className="text-sm font-black text-gray-900">{charger.type} Charger</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Rating</p>
                <p className="text-sm font-black text-gray-900">{charger.rating}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Serial Number</p>
                <p className="text-xs font-mono font-bold text-gray-600">{charger.serialNumber}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Warranty</p>
                <p className="text-sm font-black text-gray-900">{charger.warranty}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-4">
          <h2 className="text-xs font-black text-gray-900 uppercase tracking-widest">Key Features</h2>
          <div className="space-y-3">
             {[
               { icon: '⚡', title: 'Fast charging supported', desc: 'Charges battery 0-80% in under 2.5 hours' },
               { icon: '🛡️', title: 'IP rated weather protection', desc: 'Safe for use in diverse weather conditions' },
               { icon: '🧠', title: 'Smart charging compatible', desc: 'Auto-cutoff features for battery longevity' }
             ].map((feature, i) => (
               <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                 <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0 text-lg">
                   {feature.icon}
                 </div>
                 <div>
                   <h3 className="text-sm font-bold text-gray-900">{feature.title}</h3>
                   <p className="text-xs text-gray-500 mt-0.5">{feature.desc}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Support Card */}
        <div className="bg-gray-900 rounded-3xl p-6 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Need help?</p>
           <h3 className="text-lg font-bold mb-4">Charger Support</h3>
           <button 
             onClick={() => navigate('/support')}
             className="w-full bg-white text-gray-900 font-black py-3 rounded-xl active:scale-[0.98] transition-all text-sm"
           >
             {t('contact_support')}
           </button>
        </div>
      </div>
    </div>
  );
};

export default ChargerDetailsScreen;
