import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

const LoginScreen: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { setStatus } = useUser();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length > 5) {
      // Simulate login
      setStatus('installed');
      navigate('/');
    }
  };

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Top Header - Language Selector */}
      <div className="p-4 flex justify-end">
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t('login_welcome')}</h1>
          <p className="text-sm font-medium text-gray-500">{t('login_subtitle')}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex-1 flex flex-col">
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
              disabled={phone.length < 10}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-sm ${
                phone.length >= 10 
                  ? 'bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {t('login_send_otp')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
