import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Loader2, ArrowLeft } from 'lucide-react';

const LoginScreen: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { setStatus, pendingReferralCode, setPendingReferralCode } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get redirect path from location state
  const from = (location.state as any)?.from || '/';

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowOtp(true);
      }, 1000);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (pendingReferralCode) {
          console.log(`User signed up with referral code: ${pendingReferralCode}`);
          // In a real app, we'd send this to the backend
          setPendingReferralCode(null);
        }
        setStatus('installed');
        navigate(from, { replace: true });
      }, 1500);
    }
  };

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Top Header - Language Selector & Back (if OTP) */}
      <div className="p-4 flex items-center justify-between">
        {showOtp ? (
          <button 
            onClick={() => setShowOtp(false)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-900" />
          </button>
        ) : <div />}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
          className="bg-gray-50 border border-gray-200 text-sm font-bold text-gray-700 py-2 px-3 rounded-xl outline-none"
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>

      <div className="flex-1 px-6 pt-8 pb-6 flex flex-col overflow-y-auto">
        {/* Branding */}
        <div className="mb-8 text-center space-y-3">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl flex items-center justify-center transform -rotate-6 shadow-lg">
              <span className="text-3xl text-white font-black truncate">⚡</span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {showOtp ? t('login_enter_otp') : t('login_welcome')}
          </h1>
          <p className="text-sm font-medium text-gray-500">
            {showOtp ? `${t('login_otp_sent')} +91 ${phone}` : t('login_subtitle')}
          </p>
        </div>

        {/* Form */}
        {!showOtp ? (
          <form onSubmit={handleSendOtp} className="flex-1 flex flex-col">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  {t('login_mobile')}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 10) setPhone(val);
                    }}
                    placeholder="98765 43210"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-4 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-bold text-gray-900 transition-all placeholder-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <button
                type="submit"
                disabled={phone.length < 10 || loading}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
                  phone.length >= 10 && !loading
                    ? 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {t('login_send_otp')}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex-1 flex flex-col">
            <div className="space-y-6">
              <div className="flex gap-4 justify-between">
                {[...Array(4)].map((_, i) => (
                  <input
                    key={i}
                    type="tel"
                    maxLength={1}
                    className="w-16 h-16 bg-gray-50 border-2 border-gray-100 rounded-2xl text-center text-2xl font-black text-gray-900 focus:border-green-500 focus:outline-none transition-all"
                    value={otp[i] || ''}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val) {
                        const newOtp = otp.split('');
                        newOtp[i] = val;
                        setOtp(newOtp.join('').slice(0, 4));
                        // Auto focus next logic could be added here
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otp[i]) {
                         setOtp(otp.slice(0, -1));
                      }
                    }}
                  />
                ))}
              </div>
              <button 
                type="button"
                className="text-xs font-bold text-green-600 hover:underline mx-auto block"
              >
                {t('login_resend_otp')}
              </button>
            </div>

            <div className="mt-auto pt-6">
              <button
                type="submit"
                disabled={otp.length < 4 || loading}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
                  otp.length === 4 && !loading
                    ? 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {t('login_verify_otp')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
