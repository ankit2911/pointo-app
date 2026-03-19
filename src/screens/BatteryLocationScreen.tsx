import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

const BatteryLocationScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { t } = useLanguage();

  if (!user || !('locationAvailable' in user)) return null;

  const isDataAvailable = user.locationAvailable;

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
        <h1 className="text-lg font-bold text-gray-900">{t('location_live_tracking')}</h1>
      </div>

      {/* Map Content */}
      <div className="flex-1 relative bg-gray-100 overflow-hidden">
        {/* Placeholder Map Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} />
        
        {isDataAvailable ? (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Mock Pin */}
            <div className="relative">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div className="mt-2 text-center">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-gray-200 inline-block">
                  <p className="text-xs font-black text-gray-900">{user.locationName}</p>
                </div>
              </div>
            </div>
            
            {/* Live Indicator Overlay */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">{t('location_live_tracking')}</span>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-4xl mb-4 grayscale">
              🛰️
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{t('location_no_data')}</h2>
            <p className="text-sm text-gray-500 max-w-[240px]">
              {t('location_no_data_sub')}
            </p>
          </div>
        )}
      </div>

      {/* Details Bar */}
      {isDataAvailable && (
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{t('location_title')}</p>
              <h3 className="text-lg font-black text-gray-900">{user.locationName}</h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{t('location_last_updated')}</p>
              <h3 className="text-sm font-bold text-gray-900">{user.locationLastUpdated}</h3>
            </div>
          </div>
          
          <button 
            onClick={() => navigate(-1)}
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl active:scale-[0.98] transition-transform shadow-lg shadow-gray-200"
          >
            {t('location_back_to_dashboard')}
          </button>
        </div>
      )}
      
      {!isDataAvailable && (
        <div className="p-6 bg-white border-t border-gray-100">
          <button 
            onClick={() => navigate(-1)}
            className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl active:scale-[0.98] transition-transform"
          >
            {t('location_back_to_dashboard')}
          </button>
        </div>
      )}
    </div>
  );
};

export default BatteryLocationScreen;
