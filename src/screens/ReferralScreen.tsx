import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ReferralScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, approvedUser, status, activateReferral } = useUser();
  const [isActivating, setIsActivating] = useState(false);

  const currentUser = status === 'installed' ? user : approvedUser;

  useEffect(() => {
    if (currentUser?.referralEnabled) {
      navigate('/referral/dashboard', { replace: true });
    }
  }, [currentUser, navigate]);

  if (!currentUser || status === 'guest') {
    return (
      <div className="p-4 text-center mt-10">
        <p className="text-gray-500">You do not have access to this feature.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-green-600 font-semibold"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  const handleActivate = () => {
    setIsActivating(true);
    // Simulate activation delay
    setTimeout(() => {
      activateReferral();
      setIsActivating(false);
      navigate('/referral/dashboard');
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-gray-700">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Referral Program</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-3xl p-6 text-white text-center shadow-lg">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
            🎁
          </div>
          <h2 className="text-2xl font-extrabold mb-2">Join Pointo Referral Program</h2>
          <p className="text-green-50/90 text-sm leading-relaxed">
            Refer friends and earn reward points when they upgrade to lithium.
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Benefits</h3>
          <div className="space-y-4">
            {[
              { icon: '💰', title: 'Earn points for every successful referral', desc: 'Points can be used for subscription discounts.' },
              { icon: '📈', title: 'Track your referrals in real-time', desc: 'See who signed up and upgraded using your link.' },
              { icon: '🍕', title: 'Redeem rewards (coming soon)', desc: 'From vouchers to exclusive merchandise.' },
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-lg">{benefit.icon}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{benefit.title}</h4>
                  <p className="text-xs text-gray-500 mt-0.5">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-20" />
      </div>

      {/* CTA */}
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <button
          onClick={handleActivate}
          disabled={isActivating}
          className={`w-full bg-green-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-green-600/20 active:scale-[0.98] ${isActivating ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'}`}
        >
          {isActivating ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Activating...</span>
            </div>
          ) : 'Activate Referral'}
        </button>
      </div>
    </div>
  );
};

export default ReferralScreen;
