import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

/* ── Installed Profile ── */
const InstalledProfile: React.FC = () => {
  const { user, setStatus } = useUser();
  const navigate = useNavigate();
  if (!user) return null;

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: '💳', label: 'Payment History', desc: 'View EMI and transaction records', path: '/payments' },
        { icon: '📄', label: 'Documents', desc: 'KYC, agreement, and receipts', path: '/documents' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: '🎧', label: 'Help & Support', desc: 'Chat or call our team', path: '/support' },
        { icon: '📋', label: 'Service Requests', desc: 'Track pending requests', path: '/service-requests' },
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
          <span className="shrink-0 bg-green-100 text-green-700 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Active</span>
        </div>
      </div>

      {/* Battery Details */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-900 mb-3">Battery Details</h2>
        <div className="space-y-2.5">
          {[
            { label: 'Battery Model', value: user.batteryModel },
            { label: 'Dealer', value: user.dealer },
            { label: 'Installed On', value: user.installDate },
            { label: 'Warranty Until', value: user.warrantyExpiry },
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
              onClick={() => navigate(item.path)}
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
        Logout
      </button>
    </div>
  );
};

/* ── Guest Profile ── */
const GuestProfile: React.FC = () => {
  const { setStatus } = useUser();

  return (
    <div className="p-4 pb-6 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>

      <h1 className="text-xl font-extrabold text-gray-900 mb-2 text-center">
        Sign in to track your battery and payments
      </h1>
      <p className="text-sm text-gray-500 text-center mb-8 max-w-[260px]">
        Monitor charging, manage EMIs, and get personalized upgrade recommendations
      </p>

      <button
        onClick={() => setStatus('installed')}
        className="w-full max-w-[280px] bg-green-600 text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-green-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Login with Phone
      </button>

      <div className="w-full mt-10 space-y-3">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider text-center mb-2">What you'll get</p>
        {[
          { icon: '📊', title: 'Battery Health Dashboard', desc: 'Real-time stats and diagnostics' },
          { icon: '💳', title: 'Payment Tracking', desc: 'Manage EMIs and view history' },
          { icon: '🔔', title: 'Smart Alerts', desc: 'Charging tips and maintenance reminders' },
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
const ApprovedProfile: React.FC = () => {
  const { approvedUser, setStatus } = useUser();
  if (!approvedUser) return null;

  const menuSections = [
    {
      title: 'Current Step',
      items: [
        { icon: '📅', label: 'Installation Status', desc: approvedUser.installationStatus },
      ],
    },
    {
      title: 'Account',
      items: [
        { icon: '📄', label: 'Documents', desc: 'Application and financing terms' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: '🎧', label: 'Contact Support', desc: 'Reach out for help' },
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
          <span className="shrink-0 bg-indigo-100 text-indigo-700 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Approved</span>
        </div>
      </div>

      {/* Application Details */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-900 mb-3">Application Details</h2>
        <div className="space-y-2.5">
          {[
            { label: 'Lead Status', value: 'Approved', highlight: true },
            { label: 'Battery Model', value: approvedUser.batteryModel },
            { label: 'Dealer', value: approvedUser.dealer },
            { label: 'Financing', value: approvedUser.financingApproved ? 'Approved' : 'Pending', highlight: true },
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
            <button key={i} className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left border-t border-gray-50">
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800">{item.label}</p>
                <p className={`text-[10px] ${item.label === 'Installation Status' ? 'text-indigo-600 font-bold' : 'text-gray-400'}`}>{item.desc}</p>
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
        Sign Out
      </button>
    </div>
  );
};

const ProfileScreen: React.FC = () => {
  const { status } = useUser();
  if (status === 'installed') return <InstalledProfile />;
  if (status === 'approved') return <ApprovedProfile />;
  return <GuestProfile />;
};

export default ProfileScreen;
