import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const PaymentHistory: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user } = useUser();

  if (!user) return null;

  const remaining = user.totalLoan - (user.emiPaid * user.emiAmount);

  const schedule = [
    { month: 'March 2026', amount: user.emiAmount, status: 'Paid' },
    { month: 'April 2026', amount: user.emiAmount, status: 'Overdue' },
    { month: 'May 2026', amount: user.emiAmount, status: 'Upcoming' },
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
        {/* Payment Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-900 p-5 text-white">
            <h2 className="text-sm font-bold opacity-80 mb-4">{t('payment_summary')}</h2>
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-wider opacity-60 mb-0.5">{t('payment_total_loan')}</p>
                <p className="text-lg font-bold">₹{user.totalLoan.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider opacity-60 mb-0.5">{t('payment_paid')}</p>
                <p className="text-lg font-bold text-green-400">₹{(user.emiPaid * user.emiAmount).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider opacity-60 mb-0.5">{t('payment_remaining')}</p>
                <p className="text-lg font-bold">₹{remaining.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider opacity-60 mb-0.5">{t('payment_emi')}</p>
                <p className="text-lg font-bold">₹{user.emiAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="px-5 py-3 bg-gray-50 flex justify-between items-center border-t border-gray-100">
            <span className="text-xs text-gray-500 font-medium">{t('payment_tenure')}</span>
            <span className="text-sm font-bold text-gray-900">24 {t('fin_months')}</span>
          </div>
        </div>

        {/* Payment Schedule List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 pt-4 mb-2 flex justify-between items-center">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{t('payment_schedule')}</p>
          </div>
          <div className="divide-y divide-gray-50">
            {schedule.map((item, i) => (
              <div key={i} className="p-4 px-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${
                    item.status === 'Paid' ? 'bg-green-50 text-green-600' : 
                    item.status === 'Overdue' ? 'bg-red-50 text-red-600' :
                    item.status === 'Due' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {item.status === 'Paid' ? '✓' : item.status === 'Overdue' ? '!' : item.status === 'Due' ? '!' : '•'}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{item.month}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">₹{item.amount.toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${
                    item.status === 'Paid' ? 'bg-green-50 text-green-600' : 
                    item.status === 'Overdue' ? 'bg-red-50 text-red-600' :
                    item.status === 'Due' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {item.status === 'Paid' ? t('payment_status_paid') : 
                     item.status === 'Overdue' ? t('payment_status_overdue') :
                     item.status === 'Due' ? t('payment_status_due') : t('payment_status_upcoming')}
                  </span>
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
