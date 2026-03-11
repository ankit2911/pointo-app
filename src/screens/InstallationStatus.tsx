import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const InstallationStatus: React.FC = () => {
  const navigate = useNavigate();
  const { approvedUser } = useUser();
  const { t } = useLanguage();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isScheduled, setIsScheduled] = useState(false);

  if (!approvedUser) return null;

  const steps = [
    { label: t('install_step_lead'), status: 'completed' },
    { label: t('install_step_financing'), status: 'completed' },
    { label: t('install_step_schedule'), status: 'active' },
    { label: t('install_step_complete'), status: 'pending' },
  ];

  const timeSlots = [
    { day: t('install_schedule_date_tomorrow'), slots: ['10:00 AM', '2:00 PM', '5:00 PM'] },
    { day: 'Day After Tomorrow', slots: ['11:00 AM', '3:00 PM'] }, // Hardcoded one for simplicity
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <BackIcon />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-900">{t('install_status_title')}</h1>
          <p className="text-[10px] text-gray-500 font-medium">{t('install_status_desc')}</p>
        </div>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* Step Progress Tracker */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div key={idx} className="flex gap-4 relative">
                {idx < steps.length - 1 && (
                  <div className={`absolute left-3.5 top-8 bottom-[-24px] w-0.5 ${step.status === 'completed' ? 'bg-indigo-600' : 'bg-gray-200'}`} />
                )}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${
                  step.status === 'completed' ? 'bg-indigo-600 border-indigo-600' : 
                  step.status === 'active' ? 'bg-white border-indigo-600' : 'bg-white border-gray-200'
                }`}>
                  {step.status === 'completed' && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                  {step.status === 'active' && (
                    <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse" />
                  )}
                </div>
                <div className="pt-1">
                  <p className={`text-sm font-bold ${step.status === 'active' ? 'text-indigo-900' : step.status === 'completed' ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Battery Information Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-lg">🔋</span> {t('install_battery_details')}
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
              <span className="text-xs text-gray-500 font-medium">{t('install_battery_model')}</span>
              <span className="text-sm font-bold text-gray-900">{approvedUser.batteryModel}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: t('product_range'), value: `110 ${t('battery_km')}` },
                { label: t('product_charge'), value: '2.5 hrs' },
                { label: t('product_warranty'), value: '4 Yrs' },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50/50 p-2.5 rounded-xl border border-gray-100 text-center">
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-xs font-bold text-gray-900">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dealer Information Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-1">{t('install_dealership')}</h2>
          <p className="text-xs text-gray-500 mb-4">{approvedUser.dealer}</p>
          <div className="flex gap-2">
            <button className="flex-1 bg-indigo-50 text-indigo-700 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-100 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {t('install_call_dealer')}
            </button>
            <button className="flex-1 bg-gray-50 text-gray-700 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors border border-gray-200">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {t('install_directions')}
            </button>
          </div>
        </div>

        {/* Helpful Notes */}
        <div className="bg-orange-50 rounded-2xl p-5 border border-orange-100">
          <h2 className="text-xs font-extrabold text-orange-800 uppercase tracking-wide mb-3 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {t('install_before_install')}
          </h2>
          <ul className="text-xs text-orange-900 space-y-2 font-medium">
            <li className="flex gap-2 items-start"><span className="text-orange-500 mt-0.5">•</span> {t('install_note_1')}</li>
            <li className="flex gap-2 items-start"><span className="text-orange-500 mt-0.5">•</span> {t('install_note_2')}</li>
            <li className="flex gap-2 items-start"><span className="text-orange-500 mt-0.5">•</span> {t('install_note_3')}</li>
          </ul>
        </div>

        {/* Scheduling Section */}
        {isScheduled ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-4 animate-fade-in shadow-sm">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-xl">🎉</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-green-900">{t('install_scheduled_title')}</h3>
              <p className="text-xs text-green-800 mt-1 font-medium leading-relaxed">
                {t('install_scheduled_desc_1')} <span className="font-bold bg-green-200 px-1 py-0.5 rounded text-[10px]">{selectedSlot}</span>{t('install_scheduled_desc_2')}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-4">{t('install_choose_slot')}</h2>
            <div className="space-y-4">
              {timeSlots.map((group, i) => (
                <div key={i}>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2 px-1">{group.day}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.slots.map((slot) => {
                      const value = `${group.day} at ${slot}`;
                      const isSelected = selectedSlot === value;
                      return (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(value)}
                          className={`px-4 py-2 text-xs font-bold rounded-xl outline-none transition-all ${
                            isSelected 
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-105' 
                              : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-5 border-t border-gray-50">
              <button 
                onClick={() => setIsScheduled(true)}
                disabled={!selectedSlot}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex justify-center items-center ${
                  selectedSlot 
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 active:scale-[0.98]' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {t('install_confirm_btn')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallationStatus;
