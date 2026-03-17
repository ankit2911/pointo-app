import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ReferralJoinScreen: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { setPendingReferralCode, status } = useUser();

  useEffect(() => {
    if (code) {
      setPendingReferralCode(code);
    }
  }, [code, setPendingReferralCode]);

  // If already logged in, redirect home
  useEffect(() => {
    if (status !== 'guest') {
      navigate('/');
    }
  }, [status, navigate]);

  // Extract name from code (e.g., ANKIT123 -> Ankit)
  const referrerName = code ? code.replace(/[0-9]/g, '').toLowerCase() : '';
  const formattedName = referrerName.charAt(0).toUpperCase() + referrerName.slice(1);

  return (
    <div className="bg-white h-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-8">
        {/* Hero Illustration */}
        <div className="relative">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-4xl animate-bounce">
            ⚡
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-xl shadow-lg border-4 border-white">
            🎁
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-black text-gray-900 leading-tight">
            You’ve been invited to upgrade to Lithium
          </h1>
          <p className="text-gray-500 font-medium leading-relaxed">
            Join Pointo and get better range, savings, and performance for your vehicle.
          </p>
        </div>

        {formattedName && (
          <div className="bg-green-50 px-6 py-3 rounded-2xl border border-green-100 flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {formattedName[0]}
            </div>
            <p className="text-sm font-bold text-green-800">
              Referred by {formattedName}
            </p>
          </div>
        )}

        <div className="w-full space-y-4 pt-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-green-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <ZapIcon />
            Get Started
          </button>
          <p className="text-xs text-gray-400 font-medium">
            Limited time offer. Join today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferralJoinScreen;
