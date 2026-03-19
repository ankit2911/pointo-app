import React from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

/* ── SVG Progress Ring ── */
const ProgressRing: React.FC<{ percent: number; size?: number; stroke?: number }> = ({
  percent, size = 120, stroke = 8,
}) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const color = percent >= 80 ? '#16a34a' : percent >= 50 ? '#eab308' : '#ef4444';

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circumference} strokeDashoffset={offset}
        strokeLinecap="round" className="transition-all duration-1000" />
    </svg>
  );
};

/* ── Score Bar ── */
const ScoreBar: React.FC<{ label: string; value: string; level: number }> = ({ label, value, level }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-700">{value}</span>
    </div>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${level}%`,
          background: level >= 80 ? 'linear-gradient(90deg,#16a34a,#22c55e)' : level >= 60 ? 'linear-gradient(90deg,#eab308,#facc15)' : 'linear-gradient(90deg,#ef4444,#f87171)'
        }}
      />
    </div>
  </div>
);

const MyBatteryScreen: React.FC = () => {
  const { user, status } = useUser();
  const { t } = useLanguage();
  const navigate = useNavigate();

  if (status === 'approved') {
    return (
      <div className="p-4 pb-6 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            <line x1="12" y1="11" x2="12" y2="11.01" />
            <line x1="12" y1="15" x2="12" y2="15.01" />
          </svg>
        </div>
        <h1 className="text-xl font-extrabold text-gray-900 mb-2 text-center">
          {t('battery_locked_title')}
        </h1>
        <p className="text-sm text-gray-500 text-center max-w-[260px]">
          {t('battery_locked_desc')}
        </p>
      </div>
    );
  }

  if (!user) return null;

  const emiProgress = (user.emiPaid / (user.emiTotal || 1)) * 100;
  if (user.paymentStatus === 'recovered') {
    const isGraceExpired = (user.gracePeriod || 0) <= 0;
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm border border-red-200">
          {isGraceExpired ? '⛔' : '🔒'}
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">
          {isGraceExpired ? 'Grace Period Expired' : t('battery_recovered_title')}
        </h1>
        <p className="text-xs text-gray-500 mb-6 max-w-[280px] leading-relaxed">
          {isGraceExpired
            ? 'Your account has been permanently closed due to non-payment within the grace period.'
            : 'Your battery has been repossessed due to non-payment. Please clear your dues to reclaim it.'}
        </p>

        <div className="w-full space-y-4 bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100 text-left">
          <div className="flex justify-between items-center pb-2 border-b border-gray-200/50">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Due</span>
            <span className="text-base font-black text-gray-900">₹{(user.outstandingAmount || 0).toLocaleString()}</span>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500 font-medium">Missed EMIs (x{user.missedEmis})</span>
              <span className="text-gray-900 font-bold">₹{(user.recoveryBreakdown?.missedEmis || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500 font-medium">Late Penalty Fee</span>
              <span className="text-gray-900 font-bold">₹{(user.recoveryBreakdown?.lateFee || 0).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-500 font-medium">Recovery Service Charge</span>
              <span className="text-gray-900 font-bold">₹{(user.recoveryBreakdown?.recoveryCharges || 0).toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200/50">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Recovery Date</p>
              <p className="text-xs font-black text-gray-900">{user.recoveryDate}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Grace Period</p>
              <p className={`text-xs font-black ${isGraceExpired ? 'text-gray-400' : 'text-red-600'}`}>
                {isGraceExpired ? 'Expired' : `${user.gracePeriod} Days Left`}
              </p>
            </div>
          </div>
        </div>

        {!isGraceExpired && (
          <div className="bg-amber-50 rounded-xl p-3 mb-6 border border-amber-100">
            <p className="text-[9px] text-amber-700 font-bold leading-tight">
              ⚠️ Failure to reclaim within grace period may lead to permanent closure.
            </p>
          </div>
        )}

        <div className="w-full space-y-3">
          <button
            disabled={isGraceExpired}
            className={`w-full font-bold py-4 rounded-2xl transition-all shadow-lg ${isGraceExpired
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              : 'bg-gray-900 text-white active:scale-[0.98] shadow-gray-200'
              }`}
          >
            {isGraceExpired ? 'Account Closed' : t('battery_pay_reclaim')}
          </button>
          <button
            onClick={() => navigate('/support')}
            className="w-full bg-white text-gray-900 border border-gray-200 font-bold py-4 rounded-2xl active:scale-[0.98] transition-transform"
          >
            {t('battery_contact_support')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Overdue Banner */}
      {user.paymentStatus === 'overdue' && (
        <div className="bg-red-600 text-white px-4 py-2.5 text-center text-xs font-bold sticky top-0 z-20 flex items-center justify-center gap-2 shadow-lg">
          <span className="text-sm">⚠️</span>
          {t('payment_overdue_banner').replace('{{count}}', user.overdueDays?.toString() || '0')}
        </div>
      )}

      <div className="p-4 space-y-4 pb-6">
        {/* Greeting or Restriction Header */}
        {user.paymentStatus === 'defaulted' ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-xl">🚫</div>
              <div>
                <h1 className="text-lg font-black text-gray-900 leading-tight">{t('battery_account_restricted')}</h1>
                <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider">{(user.missedEmis || 0)} {t('battery_missed_emis')}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">{t('battery_restricted_msg')}</p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-xl p-3 border border-red-50">
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">{t('battery_outstanding_amount')}</p>
                <p className="text-base font-black text-gray-900">₹{(user.outstandingAmount || 0).toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl p-3 border border-red-50">
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-0.5">{t('battery_missed_emis')}</p>
                <p className="text-base font-black text-gray-900">{user.missedEmis || 0}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 bg-red-600 text-white font-bold text-xs py-3 rounded-xl active:scale-[0.98] transition-transform">
                {t('battery_pay_dues')}
              </button>
              <button
                onClick={() => navigate('/support')}
                className="flex-1 bg-white text-gray-900 font-bold text-xs py-3 rounded-xl border border-red-200 active:scale-[0.98] transition-transform"
              >
                {t('battery_contact_support')}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">{t('battery_hello')}, {user.name} 👋</h1>
            <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
              <span className={`inline-block w-2 h-2 rounded-full ${user.paymentStatus === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
              {(user.currentBatteryType === 'own' ? user.batteries.own : user.batteries.service!).model} · {user.vehicle}
            </p>
          </div>
        )}

        {/* RTF Info Card */}
        {user.currentBatteryType === 'service' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-xl">🛠️</div>
              <div>
                <h2 className="text-sm font-black text-gray-900">{t('rtf_info_title')}</h2>
                <p className="text-[10px] text-amber-700 font-bold uppercase tracking-wider">{t('rtf_status_active')}</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 mb-4 leading-relaxed">{t('rtf_info_text')}</p>
            <button
              onClick={() => navigate('/service-ticket')}
              className="w-full bg-amber-600 text-white font-bold text-xs py-3 rounded-xl active:scale-[0.98] transition-transform shadow-md shadow-amber-200"
            >
              {t('rtf_track_repair')}
            </button>
          </div>
        )}

        {/* Battery Health Card */}
        <div className={`relative ${user.paymentStatus === 'defaulted' ? 'opacity-50 grayscale select-none pointer-events-none' : ''}`}>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-sm font-bold text-gray-900">{t('battery_health')}</h2>
              <div className="flex gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border italic ${user.currentBatteryType === 'service'
                  ? 'text-amber-600 bg-amber-50 border-amber-100'
                  : 'text-green-600 bg-green-50 border-green-100'
                  }`}>
                  {user.currentBatteryType === 'service' ? t('rtf_service_tag') : 'Battery Active'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-5 mt-3">
              <div className="relative shrink-0">
                <ProgressRing percent={user.batteryHealth} size={110} stroke={8} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold text-gray-900">{user.batteryHealth}%</span>
                  <span className="text-[10px] text-gray-400 font-medium">{t('battery_health_label')}</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{t('battery_range_estimate')}</p>
                  <p className="text-lg font-extrabold text-gray-900">{user.rangeEstimate} <span className="text-xs font-medium text-gray-400">{t('battery_km')}</span></p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">{t('battery_charge_cycles')}</p>
                  <p className="text-lg font-extrabold text-gray-900">{user.chargeCycles}</p>
                </div>
              </div>
            </div>
          </div>
          {user.paymentStatus === 'defaulted' && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-gray-900/80 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-xl">
                {t('battery_unavailable_dues')}
              </div>
            </div>
          )}
        </div>

        {/* Battery Score Card */}
        <div className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 ${user.paymentStatus === 'defaulted' ? 'opacity-50' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">{t('battery_score')}</h2>
            <div className="flex items-center gap-1">
              <span className="text-xl font-extrabold text-green-600">{user.batteryScore}</span>
              <span className="text-xs text-gray-400 font-medium">/ 10</span>
            </div>
          </div>
          <div className="space-y-3">
            <ScoreBar label={t('battery_charging_behavior')} value={user.chargingBehaviour} level={user.chargingBehaviour === 'Excellent' ? 95 : user.chargingBehaviour === 'Good' ? 78 : 55} />
            <ScoreBar label={t('battery_usage_efficiency')} value={user.usageEfficiency} level={user.usageEfficiency === 'Excellent' ? 92 : user.usageEfficiency === 'Good' ? 75 : 50} />
          </div>
        </div>


        {/* Charger Card */}
        {user.charger && (
          <div className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 ${user.paymentStatus === 'defaulted' ? 'opacity-50 grayscale' : ''}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔌</span>
                <h2 className="text-sm font-bold text-gray-900">Charger</h2>
              </div>
              {user.charger.ipRated && (
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase border border-blue-100">
                  IP Rated
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-base font-extrabold text-gray-900 leading-tight">
                  {user.charger.brand} {user.charger.type} Charger
                </p>
                <div className="flex flex-col">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    Rating: {user.charger.rating} · {user.charger.warranty} Warranty
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">
                    Serial: {user.charger.serialNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/charger-details')}
                className="bg-gray-50 text-gray-900 font-bold text-[10px] px-4 py-2 rounded-xl border border-gray-100 active:scale-95 transition-all"
              >
                View Details
              </button>
            </div>
          </div>
        )}


        {/* Insights Card */}
        <div className={`relative ${user.paymentStatus === 'defaulted' ? 'opacity-50 grayscale select-none pointer-events-none' : ''}`}>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-3">{t('battery_insights')}</h2>
            <div className="space-y-2">
              {[
                { icon: '⚠️', text: t('battery_tip_1'), color: 'bg-amber-50 text-amber-800 border-amber-100' },
                { icon: '✅', text: t('battery_tip_2'), color: 'bg-green-50 text-green-800 border-green-100' },
                { icon: '⚡', text: t('battery_tip_3'), color: 'bg-blue-50 text-blue-800 border-blue-100' },
              ].map((tip, i) => (
                <div key={i} className={`flex items-start gap-2.5 p-3 rounded-xl text-xs font-medium border ${tip.color}`}>
                  <span className="text-sm shrink-0">{tip.icon}</span>
                  <span className="leading-relaxed">{tip.text}</span>
                </div>
              ))}
            </div>
          </div>
          {user.paymentStatus === 'defaulted' && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-gray-900/80 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-xl">
                {t('battery_unavailable_dues')}
              </div>
            </div>
          )}
        </div>

        {/* Battery Location Card */}
        <div className={`relative ${user.paymentStatus === 'defaulted' ? 'opacity-50 grayscale select-none pointer-events-none' : ''}`}>
          <div
            onClick={() => navigate('/battery-location')}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.98] transition-all cursor-pointer group"
          >
            <div className="p-5 pb-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">{t('location_title')}</h2>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">LIVE</span>
                </div>
              </div>
            </div>

            <div className="h-32 bg-gray-50 relative flex items-center justify-center overflow-hidden">
              {/* Mock Map Texture */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)',
                backgroundSize: '10px 10px'
              }} />
              <div className="absolute inset-x-0 h-px bg-gray-200 top-1/2 -translate-y-1/2" />
              <div className="absolute inset-y-0 w-px bg-gray-200 left-1/2 -translate-x-1/2" />

              {/* Map Pin */}
              <div className="relative z-10 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>

              {/* Location Info Overlay */}
              <div className="absolute bottom-3 left-3 flex flex-col gap-0.5">
                <div className="bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm border border-gray-100 inline-block self-start">
                  <p className="text-[10px] font-black text-gray-900">{user.locationName || 'Bangalore'}</p>
                </div>
                <p className="text-[8px] text-gray-400 font-bold uppercase ml-1">{user.locationLastUpdated || '2 mins ago'}</p>
              </div>
            </div>

            <div className="p-3 bg-gray-900 group-hover:bg-gray-800 transition-colors text-center">
              <p className="text-[10px] font-bold text-white tracking-wider uppercase">{t('location_view_map')}</p>
            </div>
          </div>
          {user.paymentStatus === 'defaulted' && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-gray-900/80 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-xl">
                {t('battery_unavailable_dues')}
              </div>
            </div>
          )}
        </div>

        {/* Next EMI Card / Overdue Card (Hidden if defaulted) */}
        {user.paymentStatus !== 'defaulted' && (
          <div className={`rounded-2xl p-5 shadow-sm border ${user.paymentStatus === 'overdue' ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'
            }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900">
                {user.paymentStatus === 'overdue' ? t('battery_overdue_payment') : t('battery_next_emi')}
              </h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${user.paymentStatus === 'overdue' ? 'text-red-600 bg-red-100' : 'text-blue-600 bg-blue-50'
                }`}>
                {user.paymentStatus === 'overdue' ? t('battery_overdue_badge') : t('battery_upcoming')}
              </span>
            </div>

            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-2xl font-extrabold text-gray-900">₹{user.emiAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {user.paymentStatus === 'overdue' ? `${t('battery_due_since')} 5 March` : `${t('battery_due_on')} 5 April`}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${user.paymentStatus === 'overdue' ? 'bg-red-100' : 'bg-gray-50'
                }`}>
                {user.paymentStatus === 'overdue' ? '⚠️' : '📅'}
              </div>
            </div>

            <div className="flex gap-2">
              <button className={`flex-1 font-semibold text-xs py-3 rounded-xl transition-colors active:scale-[0.98] ${user.paymentStatus === 'overdue' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                {t('battery_pay_now')}
              </button>
              <button
                onClick={() => user.paymentStatus === 'overdue' ? navigate('/support') : navigate('/payments')}
                className="flex-1 bg-white text-gray-900 font-semibold text-xs py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors active:scale-[0.98]"
              >
                {user.paymentStatus === 'overdue' ? t('battery_contact_support') : t('battery_view_details')}
              </button>
            </div>
          </div>
        )}

        {/* Finance Status Card */}
        <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white relative overflow-hidden ${user.paymentStatus === 'defaulted' ? 'opacity-50 grayscale select-none pointer-events-none' : ''}`}>
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-500/10 rounded-full" />
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">{t('battery_finance_status')}</p>
          <h3 className="text-base font-bold mb-0.5">Pointo Finance</h3>
          <div className="flex items-end gap-2 mb-3">
            <span className="text-2xl font-extrabold text-green-400">₹{user.emiAmount}</span>
            <span className="text-xs text-gray-400 mb-1">{t('battery_per_month')}</span>
          </div>

          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">{t('battery_emi_progress')}</span>
              <span className="font-semibold text-white">{user.emiPaid} / {user.emiTotal} {t('battery_paid')}</span>
            </div>
            <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-700"
                style={{ width: `${emiProgress}%` }}
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => navigate('/payments')}
              className="flex-1 bg-white/10 text-white font-semibold text-xs py-2.5 rounded-xl hover:bg-white/20 transition-colors active:scale-[0.98]">
              {t('battery_view_statement')}
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`relative ${user.paymentStatus === 'defaulted' ? 'opacity-50 grayscale select-none pointer-events-none' : ''}`}>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-3">{t('battery_quick_actions')}</h2>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[
                { icon: '🔧', label: t('battery_action_service') },
                { icon: '📞', label: t('battery_action_contact') },
                { icon: '🛡️', label: t('battery_action_warranty') },
              ].map((action, i) => (
                <button key={i} className="bg-gray-50 rounded-xl p-3 flex flex-col items-center gap-1.5 hover:bg-gray-100 transition-colors active:scale-[0.97]">
                  <span className="text-xl">{action.icon}</span>
                  <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight whitespace-pre-line">{action.label}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl">
              <span className="text-sm">📍</span>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{t('battery_your_dealer')}</p>
                <p className="text-xs font-bold text-gray-900">{user.dealer}</p>
              </div>
            </div>
          </div>
          {user.paymentStatus === 'defaulted' && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="bg-gray-900/80 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm shadow-xl">
                {t('battery_unavailable_dues')}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBatteryScreen;
