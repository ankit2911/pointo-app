import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const PaymentHistory: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const transactions = [
    { month: 'March 2026', amount: 499, status: 'Paid', date: '5 Mar 2026' },
    { month: 'Feb 2026', amount: 499, status: 'Paid', date: '5 Feb 2026' },
    { month: 'Jan 2026', amount: 499, status: 'Paid', date: '5 Jan 2026' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 p-4 sticky top-0 z-10 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <BackIcon />
        </button>
        <h1 className="text-lg font-bold text-gray-900">{t('payment_history_title')}</h1>
      </div>

      <div className="p-4 space-y-4 pb-6">
        {/* Summary Card */}
        <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-2xl p-5 shadow-sm text-white relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-6xl opacity-10">💳</div>
          <div className="relative z-10 space-y-3">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-xs text-indigo-200">{t('payment_provider')}</span>
              <span className="text-sm font-bold">{t('payment_pointo_finance')}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-xs text-indigo-200">{t('payment_emi_amount')}</span>
              <span className="text-sm font-bold text-green-300">₹499{t('battery_per_month')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-indigo-200">{t('payment_paid_progress')}</span>
              <span className="text-sm font-bold">6 / 24</span>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider px-5 pt-4 mb-2">{t('payment_transactions')}</p>
          <div className="divide-y divide-gray-50">
            {transactions.map((tx, i) => (
              <div key={i} className="p-4 px-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-bold shrink-0">
                    ₹
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{tx.month}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">₹{tx.amount}</p>
                  <p className="text-[10px] font-bold text-green-600 uppercase tracking-wide mt-1">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Button */}
        <button className="w-full bg-white text-gray-900 font-semibold text-sm py-3.5 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          {t('payment_download_statement')}
        </button>
      </div>
    </div>
  );
};

export default PaymentHistory;
