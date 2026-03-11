import React from 'react';

const ProfileScreen: React.FC = () => {
  return (
    <div className="p-4 pb-6 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      {/* Avatar placeholder */}
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

      <button className="w-full max-w-[280px] bg-green-600 text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-green-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-green-600/20">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Login with Phone
      </button>

      {/* Feature preview cards */}
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

export default ProfileScreen;
