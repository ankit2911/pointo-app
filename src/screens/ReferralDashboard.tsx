import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { InstalledUser } from '../types';

const ChevronLeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const ShareIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getColors = () => {
    switch (status) {
      case 'Installed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Approved': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Application Submitted': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Signed Up': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getColors()}`}>
      {status}
    </span>
  );
};

const ReferralDashboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user, approvedUser, status } = useUser();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const currentUser = status === 'installed' ? user : approvedUser;
  const isInstalled = status === 'installed';
  const installedUser = isInstalled ? (currentUser as InstalledUser) : null;

  if (isInstalled && installedUser?.paymentStatus === 'recovered') {
    return (
      <div className="bg-white min-h-screen flex flex-col pt-12 items-center px-6 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-6 grayscale">
          🎁
        </div>
        <h1 className="text-xl font-black text-gray-900 mb-2">Referrals Unavailable</h1>
        <p className="text-sm text-gray-500 mb-8 max-w-[280px]">
          Referral features are hidden until the battery is reclaimed.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-sm"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (isInstalled && installedUser?.paymentStatus === 'defaulted') {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-4xl mb-6">
          🎁
        </div>
        <h1 className="text-xl font-black text-gray-900 mb-2">{t('referral_unavailable_restricted')}</h1>
        <p className="text-sm text-gray-500 mb-8">
          {t('battery_unavailable_dues')}
        </p>
        <button 
          onClick={() => navigate('/my-battery')}
          className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold"
        >
          {t('battery_pay_dues')}
        </button>
      </div>
    );
  }

  if (!currentUser || !currentUser.referralEnabled) {
    return (
      <div className="p-4 text-center mt-10">
        <p className="text-gray-500">You haven't enrolled in the referral program yet.</p>
        <button 
          onClick={() => navigate('/referral')}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-xl font-bold"
        >
          Join Now
        </button>
      </div>
    );
  }

  const handleCopy = (text: string, isCode: boolean) => {
    navigator.clipboard.writeText(text);
    if (isCode) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join Pointo',
        text: 'Upgrade to lithium and earn rewards!',
        url: currentUser.referralLink,
      });
    } else {
      handleCopy(currentUser.referralLink || '', false);
    }
  };

  const referrals = currentUser.referrals || [];
  const successfulReferrals = referrals.filter(r => r.status === 'Installed').length;
  const totalPoints = referrals.reduce((acc, r) => acc + r.points, 0);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-4 sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate('/')} className="p-1 -ml-1 text-gray-700">
          <ChevronLeftIcon />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Referral Dashboard</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-10">
        {/* Overdue Banner */}
        {isInstalled && installedUser?.paymentStatus === 'overdue' && (
          <div className="bg-amber-100 border-b border-amber-200 px-4 py-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-900">
              ⚠️ {t('referral_rewards_paused')}
            </p>
          </div>
        )}
        {/* Referral Code & Link Card */}
        <div className="p-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
            <div className="text-center">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">Your Referral Code</p>
              <div className="bg-gray-50 border-2 border-dashed border-green-200 rounded-2xl py-4 px-6 inline-flex items-center gap-4 relative">
                <span className="text-2xl font-black text-gray-900 tracking-widest">{currentUser.referralCode}</span>
                <button 
                  onClick={() => handleCopy(currentUser.referralCode || '', true)}
                  className="text-green-600 p-1 hover:bg-green-50 rounded-lg"
                >
                  {copiedCode ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Your Referral Link</p>
              <div className="bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 text-xs text-gray-500 mb-4 overflow-hidden text-ellipsis whitespace-nowrap">
                {currentUser.referralLink}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleCopy(currentUser.referralLink || '', false)}
                  className="flex-1 bg-white text-green-600 border border-green-600 py-3 rounded-xl font-bold text-sm active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {copiedLink ? <CheckIcon /> : <CopyIcon />}
                  {copiedLink ? 'Copied' : 'Copy Link'}
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold text-sm shadow-md shadow-green-600/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <ShareIcon />
                  Share Link
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="px-4 grid grid-cols-3 gap-3">
          {[
            { label: 'Total', value: referrals.length, icon: '👥' },
            { label: 'Successful', value: successfulReferrals, icon: '✅' },
            { label: 'Points', value: `${totalPoints}`, icon: '💎' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 text-center">
              <span className="text-xl mb-1 block">{stat.icon}</span>
              <p className="text-[10px] text-gray-500 font-medium uppercase truncate">{stat.label}</p>
              <p className="text-lg font-extrabold text-gray-900 mt-0.5">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Info Rules (Mock) */}
        <div className="p-4">
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
            <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">Earnings Guide</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-amber-800">
                <span>Friend signs up</span>
                <span className="font-bold">+100 pts</span>
              </div>
              <div className="flex justify-between text-xs text-amber-800">
                <span>Friend gets approved</span>
                <span className="font-bold">+300 pts</span>
              </div>
              <div className="flex justify-between text-xs text-amber-800">
                <span>Friend installs Pointo</span>
                <span className="font-bold">+1000 pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Referral List */}
        <div className="p-4 space-y-4">
          <h3 className="text-base font-bold text-gray-900">Your Referrals</h3>
          
          {referrals.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                👋
              </div>
              <p className="text-gray-900 font-bold mb-1">You haven’t referred anyone yet</p>
              <p className="text-xs text-gray-500">Share your code to start earning points!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {referrals.map((referral) => (
                <div key={referral.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {referral.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{referral.name}</p>
                      <div className="mt-1">
                        <StatusBadge status={referral.status} />
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-green-600">+{referral.points}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Points</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralDashboard;
