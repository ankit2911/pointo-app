import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const LanguageModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { language, setLanguage, t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose}>
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl overflow-hidden p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">{t('lang_select')}</h2>
          <button onClick={onClose} className="p-2 bg-gray-50 text-gray-400 hover:text-gray-600 rounded-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => { setLanguage('en'); onClose(); }}
            className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${language === 'en' ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className={`font-bold ${language === 'en' ? 'text-green-700' : 'text-gray-700'}`}>{t('lang_en')}</span>
            {language === 'en' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
          </button>

          <button
            onClick={() => { setLanguage('hi'); onClose(); }}
            className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${language === 'hi' ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white hover:border-gray-200'}`}
          >
            <span className={`font-bold ${language === 'hi' ? 'text-green-700' : 'text-gray-700'}`}>{t('lang_hi')}</span>
            {language === 'hi' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Installed Profile ── */
const InstalledProfile: React.FC<{ onOpenLanguage: () => void }> = ({ onOpenLanguage }) => {
  const { user, setStatus } = useUser();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  if (!user) return null;

  const menuSections: { title: string; items: { icon: string; label: string; desc: string; onClick?: () => void; path?: string }[] }[] = [
    {
      title: t('profile_settings'),
      items: [
        { icon: '🌐', label: t('profile_language'), desc: language === 'hi' ? t('lang_hi') : t('lang_en'), onClick: onOpenLanguage },
      ],
    },
    {
      title: t('account'),
      items: [
        { icon: '💳', label: t('payment_history'), desc: t('payment_history_desc'), path: '/payments' },
        { icon: '📄', label: t('documents'), desc: t('documents_desc'), path: '/documents' },
      ],
    },
    {
      title: t('support'),
      items: [
        { icon: '🎧', label: t('contact_support'), desc: t('contact_support_desc'), path: '/support' },
        { icon: '📋', label: t('service_requests'), desc: t('service_requests_desc'), path: '/service-requests' },
      ],
    },
  ];

  return (
    <div className="p-4 pb-6 space-y-4">
      {/* User Info Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-lg font-extrabold shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-extrabold text-gray-900">{user.name}</h1>
            <p className="text-xs text-gray-500">{user.vehicle}</p>
          </div>
          <span className="shrink-0 bg-green-100 text-green-700 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">{t('installed_active_badge')}</span>
        </div>
      </div>

      {/* Battery Details */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-900 mb-3">{t('battery_details')}</h2>
        <div className="space-y-2.5">
          {[
            { label: t('approved_battery_model'), value: user.batteryModel },
            { label: t('approved_dealer'), value: user.dealer },
            { label: t('installed_on'), value: user.installDate },
            { label: t('warranty_until'), value: user.warrantyExpiry },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center py-1.5">
              <span className="text-xs text-gray-400">{item.label}</span>
              <span className="text-xs font-semibold text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      {menuSections.map((section, si) => (
        <div key={si} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-5 pt-4 pb-2">{section.title}</p>
          {section.items.map((item, i) => (
            <button 
              key={i} 
              onClick={() => {
                if (item.onClick) item.onClick();
                else if (item.path) navigate(item.path);
              }}
              className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-50"
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                <p className="text-[10px] text-gray-400">{item.desc}</p>
              </div>
              <ChevronRight />
            </button>
          ))}
        </div>
      ))}

      {/* Logout */}
      <button
        onClick={() => setStatus('guest')}
        className="w-full py-3 text-sm font-semibold text-red-500 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-red-50 transition-colors"
      >
        {t('logout')}
      </button>
    </div>
  );
};

/* ── Guest Profile ── */
const GuestProfile: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="p-4 pb-6 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>

      <h1 className="text-xl font-extrabold text-gray-900 mb-2 text-center">
        {t('guest_profile_title')}
      </h1>
      <p className="text-sm text-gray-500 text-center mb-8 max-w-[260px]">
        {t('guest_profile_subtitle')}
      </p>

      <button
        onClick={() => navigate('/login')}
        className="w-full max-w-[280px] bg-green-600 text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-green-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        {t('guest_profile_login_btn')}
      </button>

      <div className="w-full mt-10 space-y-3">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider text-center mb-2">{t('guest_profile_benefits_title')}</p>
        {[
          { icon: '📊', title: t('guest_profile_benefit_1_title'), desc: t('guest_profile_benefit_1_desc') },
          { icon: '💳', title: t('guest_profile_benefit_2_title'), desc: t('guest_profile_benefit_2_desc') },
          { icon: '🔔', title: t('guest_profile_benefit_3_title'), desc: t('guest_profile_benefit_3_desc') },
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <span className="text-xl">{f.icon}</span>
            <div>
              <h3 className="text-sm font-semibold text-gray-700">{f.title}</h3>
              <p className="text-xs text-gray-400">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Approved Profile ── */
const ApprovedProfile: React.FC<{ onOpenLanguage: () => void }> = ({ onOpenLanguage }) => {
  const { approvedUser, setStatus } = useUser();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  if (!approvedUser) return null;

  const menuSections: { title: string; items: { icon: string; label: string; desc: string; onClick?: () => void; path?: string }[] }[] = [
    {
      title: t('profile_settings'),
      items: [
        { icon: '🌐', label: t('profile_language'), desc: language === 'hi' ? t('lang_hi') : t('lang_en'), onClick: onOpenLanguage },
      ],
    },
    {
      title: t('current_step'),
      items: [
        { icon: '📅', label: t('installation_status'), desc: approvedUser.installationStatus, path: '/installation-status' },
      ],
    },
    {
      title: t('account'),
      items: [
        { icon: '📄', label: t('documents'), desc: t('documents_desc'), path: '/documents' },
      ],
    },
    {
      title: t('support'),
      items: [
        { icon: '🎧', label: t('contact_support'), desc: t('contact_support_desc'), path: '/support' },
      ],
    },
  ];

  return (
    <div className="p-4 pb-6 space-y-4">
      {/* User Info Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-extrabold shrink-0">
            {approvedUser.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-extrabold text-gray-900">{approvedUser.name}</h1>
            <p className="text-xs text-gray-500">{approvedUser.vehicle}</p>
          </div>
          <span className="shrink-0 bg-indigo-100 text-indigo-700 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">{t('approved_profile_badge')}</span>
        </div>
      </div>

      {/* Application Details */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-900 mb-3">{t('approved_application_details')}</h2>
        <div className="space-y-2.5">
          {[
            { label: t('approved_lead_status'), value: t('approved_profile_badge'), highlight: true },
            { label: t('approved_battery_model'), value: approvedUser.batteryModel },
            { label: t('approved_dealer'), value: approvedUser.dealer },
            { label: t('approved_financing'), value: approvedUser.financingApproved ? t('approved_profile_badge') : t('approved_pending'), highlight: true },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center py-1.5">
              <span className="text-xs text-gray-400">{item.label}</span>
              <span className={`text-xs font-semibold ${item.highlight ? 'text-green-600' : 'text-gray-800'}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Sections */}
      {menuSections.map((section, si) => (
        <div key={si} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-5 pt-4 pb-2">{section.title}</p>
          {section.items.map((item, i) => (
            <button 
              key={i} 
              onClick={() => {
                if (item.onClick) item.onClick();
                else if (item.path) navigate(item.path);
              }}
              className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-50"
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                <p className={`text-[10px] ${item.label === t('installation_status') ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>{item.desc}</p>
              </div>
              <ChevronRight />
            </button>
          ))}
        </div>
      ))}

      {/* Temporary Logout to test states */}
      <button
        onClick={() => setStatus('guest')}
        className="w-full py-3 text-sm font-semibold text-gray-500 bg-white rounded-2xl border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors"
      >
        {t('logout')}
      </button>
    </div>
  );
};

const ProfileScreen: React.FC = () => {
  const { status } = useUser();
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  return (
    <>
      {status === 'installed' && <InstalledProfile onOpenLanguage={() => setIsLangModalOpen(true)} />}
      {status === 'approved' && <ApprovedProfile onOpenLanguage={() => setIsLangModalOpen(true)} />}
      {status === 'guest' && <GuestProfile />}
      
      <LanguageModal isOpen={isLangModalOpen} onClose={() => setIsLangModalOpen(false)} />
    </>
  );
};

export default ProfileScreen;
