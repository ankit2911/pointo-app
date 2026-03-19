import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ReferralCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full -translate-y-8 translate-x-8 -z-0" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🎁</span>
          <h2 className="text-base font-bold text-gray-900">Earn Rewards by Referring Friends</h2>
        </div>
        <p className="text-xs text-gray-500 mb-4 pr-10">
          Invite others to upgrade to lithium and earn points.
        </p>
        <button
          onClick={() => navigate('/referral')}
          className="bg-green-600 text-white font-semibold text-xs py-2.5 px-6 rounded-xl hover:bg-green-700 transition-all active:scale-[0.98] shadow-md shadow-green-600/10"
        >
          Start Referring
        </button>
      </div>
    </div>
  );
};

/* ── Installed User Home ── */
const InstalledHome: React.FC = () => {
  const { user } = useUser();
  const { t } = useLanguage();
  const navigate = useNavigate();
  if (!user) return null;

  const activeBattery = user.currentBatteryType === 'own' ? user.batteries.own : user.batteries.service!;

  if (user.paymentStatus === 'recovered') {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-4xl mb-6">
          🔒
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-3">{t('battery_recovered_title')}</h1>
        <p className="text-sm text-gray-500 mb-8 max-w-[280px]">
          {t('battery_recovered_msg')}
        </p>

        <div className="w-full space-y-3 bg-gray-50 rounded-2xl p-5 mb-8">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{t('battery_total_due')}</span>
            <span className="text-sm font-bold text-gray-900">₹{(user.outstandingAmount || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-gray-200">
            <span className="text-xs text-gray-500">{t('battery_grace_period')}</span>
            <span className="text-sm font-bold text-red-600">{(user.gracePeriod || 0)} {t('battery_days_count').replace('{{count}}', '')}</span>
          </div>
        </div>

        <div className="w-full space-y-3">
          <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl active:scale-[0.98] transition-transform">
            {t('battery_pay_reclaim')}
          </button>
          <button 
            onClick={() => navigate('/support')}
            className="w-full bg-white text-gray-900 font-bold py-4 rounded-2xl border border-gray-200 active:scale-[0.98] transition-transform"
          >
            {t('battery_contact_support')}
          </button>
        </div>
      </div>
    );
  }

  if (user.paymentStatus === 'defaulted') {
    return (
       <div className="p-4 space-y-4 pb-6">
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

          {/* Placeholder for disabled sections */}
          <div className="space-y-4 opacity-50 grayscale pointer-events-none select-none">
             <div className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="text-2xl mb-2">🔒</div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('battery_unavailable_dues')}</p>
             </div>
             <div className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-center justify-center text-center">
                <div className="text-2xl mb-2">🎁</div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('battery_unavailable_dues')}</p>
             </div>
          </div>
       </div>
    );
  }

  return (
    <div className="relative">
      {/* Overdue Banner */}
      {user.paymentStatus === 'overdue' && (
        <div className="bg-red-600 text-white px-4 py-2 text-center text-[10px] font-black uppercase tracking-widest sticky top-0 z-20 shadow-lg">
          {t('home_overdue_banner')}
        </div>
      )}

      <div className="p-4 space-y-4 pb-6">
        {/* Overdue Payment Card */}
        {user.paymentStatus === 'overdue' && (
          <div className="bg-red-600 rounded-2xl p-4 text-white flex items-center justify-between shadow-xl shadow-red-600/20">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{t('payment_overdue_card_title')}</p>
              <p className="text-2xl font-black mt-1">₹{user.emiAmount.toLocaleString()}</p>
            </div>
            <button className="bg-white text-red-600 font-black text-xs px-6 py-2.5 rounded-xl active:scale-95 transition-all">
              {t('battery_pay_now')}
            </button>
          </div>
        )}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-500 to-emerald-400 p-5 text-white">
        <div className="absolute top-0 right-14 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
          <div className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg border ${
            user.currentBatteryType === 'service'
              ? 'bg-amber-400 text-gray-900 border-amber-300'
              : 'bg-white/20 text-white border-white/30 backdrop-blur-sm'
          }`}>
            {user.currentBatteryType === 'service' ? t('rtf_service_tag') : 'Battery Active'}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-green-100 font-semibold mb-1">
            {user.currentBatteryType === 'service' ? 'Service Battery' : t('home_your_battery')} · {activeBattery.model}
          </p>
          <p className="text-[10px] text-green-50/70 font-bold uppercase tracking-widest -mt-0.5">
            Serial: {activeBattery.serialNumber}
          </p>
          <div className="flex items-center gap-6 mt-3">
            <div>
              <p className="text-3xl font-extrabold">{user.batteryHealth}%</p>
              <p className="text-xs text-green-100 mt-0.5">{t('home_health')}</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-3xl font-extrabold">{user.rangeEstimate}<span className="text-sm font-semibold ml-0.5">km</span></p>
              <p className="text-xs text-green-100 mt-0.5">{t('home_range_est')}</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/my-battery')}
            className="mt-4 bg-white text-green-700 font-semibold text-sm py-2.5 px-5 rounded-xl hover:bg-green-50 transition-all active:scale-[0.98]"
          >
            {t('home_view_dashboard')}
          </button>
        </div>
      </div>

      {/* Referral Card */}
      <ReferralCard />

      {/* Community Activity */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-base font-bold text-gray-900 mb-3">{t('home_community_activity')}</h2>
        <div className="space-y-3">
          {[
            { name: 'Priya N.', msg: 'Just completed 100 charge cycles — still going strong!', time: '2h ago' },
            { name: 'Karthik I.', msg: 'Battery score hit 9.1 after following the tips!', time: '5h ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                {item.name.split(' ').map(w => w[0]).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-800 font-semibold">{item.name} <span className="text-gray-400 font-normal">· {item.time}</span></p>
                <p className="text-xs text-gray-500 mt-0.5">{item.msg}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/community')}
          className="w-full mt-3 text-green-600 font-semibold text-xs py-2 rounded-xl border border-green-200 hover:bg-green-50 transition-colors"
        >
          {t('home_see_all_stories')}
        </button>
      </div>

      {/* Charging Best Practices */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-base font-bold text-gray-900 mb-3">{t('home_charging_tips')}</h2>
        <div className="space-y-2">
          {[
            t('home_tip_1'),
            t('home_tip_2'),
            t('home_tip_3'),
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-lg">
              <span className="text-xs mt-0.5">💡</span>
              <p className="text-xs text-amber-800 font-medium leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Upgrade Tips */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-5 text-white">
        <div className="absolute -right-4 -bottom-4 text-5xl opacity-10">🔋</div>
        <div className="relative z-10">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">{t('home_did_you_know')}</p>
          <h3 className="text-base font-bold mb-1">{t('home_battery_power')}</h3>
          <p className="text-xs text-gray-400 mb-3">{t('home_battery_power_desc')}</p>
          <button
            onClick={() => navigate('/explore')}
            className="bg-white/10 text-white font-semibold text-xs py-2.5 px-4 rounded-xl hover:bg-white/20 transition-colors active:scale-[0.98]"
          >
            {t('home_explore_accessories')}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

/* ── Guest Home (existing) ── */
const GuestHome: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-500 to-emerald-400 p-5 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-10 -translate-x-6" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold mb-3">
            <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
            {t('home_live_area')}
          </div>
          <h1 className="text-2xl font-extrabold leading-tight mb-1">
            {t('home_city_switching')}
          </h1>
          <p className="text-sm text-green-100 font-medium">
            {t('home_riders_upgraded')}
          </p>
        </div>
      </div>

      {/* Benefits Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-base font-bold text-gray-900 mb-4">{t('home_why_upgrade')}</h2>
        <div className="space-y-3">
          {[
            { icon: '⚡', title: t('home_benefit_1_title'), desc: t('home_benefit_1_desc') },
            { icon: '💰', title: t('home_benefit_2_title'), desc: t('home_benefit_2_desc') },
            { icon: '🔋', title: t('home_benefit_3_title'), desc: t('home_benefit_3_desc') },
          ].map((b, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-xl mt-0.5">{b.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{b.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => {
            if (status === 'guest') {
              navigate('/login', { state: { from: '/financing/start' } });
            } else {
              navigate('/financing/start');
            }
          }}
          className="w-full mt-4 bg-green-600 text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-green-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
        >
          <ZapIcon />
          {t('home_check_eligibility')}
        </button>
      </div>

      {/* Financing Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 p-5 text-white">
        <div className="absolute -right-4 -bottom-4 text-6xl opacity-10">💳</div>
        <div className="relative z-10">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{t('home_easy_financing')}</p>
          <h2 className="text-xl font-extrabold leading-tight mb-1">
            {t('home_upgrade_starting')}<br />
            <span className="text-green-400">₹499/month</span> {t('home_with_financing')}
          </h2>
          <p className="text-xs text-gray-400 mt-2 mb-4">{t('home_zero_down')}</p>
          <button
            onClick={() => navigate('/explore')}
            className="bg-white text-gray-900 font-semibold text-sm py-3 px-5 rounded-xl hover:bg-gray-100 transition-all active:scale-[0.98]"
          >
            {t('home_explore_batteries')}
          </button>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex -space-x-2">
            {['RS', 'PN', 'MI'].map((a, i) => (
              <div key={i} className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white">
                {a}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-800">2,400+</span> {t('home_riders_switched')}
          </p>
        </div>
        <button
          onClick={() => navigate('/community')}
          className="w-full text-green-600 font-semibold text-sm py-2.5 rounded-xl border-2 border-green-600 hover:bg-green-50 transition-colors active:scale-[0.98]"
        >
          {t('home_see_stories')}
        </button>
      </div>
    </div>
  );
};

/* ── Approved Customer Home ── */
const ApprovedHome: React.FC = () => {
  const { approvedUser } = useUser();
  const { t } = useLanguage();
  const navigate = useNavigate();
  if (!approvedUser) return null;

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Installation Ready Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900 to-indigo-700 p-5 text-white">
        <div className="absolute -right-4 -bottom-4 text-6xl opacity-20">⚡</div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold mb-3">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {t('home_approved_badge')}
          </div>
          <h1 className="text-2xl font-extrabold leading-tight mb-4">
            {t('home_lithium_ready')}
          </h1>
          
          <div className="space-y-3 mb-5">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-xs text-indigo-200">{t('home_battery')}</span>
              <span className="text-sm font-bold">{approvedUser.batteryModel}</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-xs text-indigo-200">{t('home_financing_approved')}</span>
              <span className="text-sm font-bold text-green-300">₹{approvedUser.emiAmount}/month EMI</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-indigo-200">{t('home_dealer')}</span>
              <span className="text-sm font-bold text-right">{approvedUser.dealer}</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => navigate('/installation')}
              className="w-full bg-white text-indigo-700 font-bold text-sm py-3.5 rounded-xl hover:bg-gray-50 transition-all active:scale-[0.98] shadow-lg shadow-black/10"
            >
              {t('home_schedule_install')}
            </button>
            <button className="w-full bg-white/10 text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-white/20 transition-colors active:scale-[0.98]">
              {t('home_call_dealer')}
            </button>
          </div>
        </div>
      </div>

      {/* Referral Card */}
      <ReferralCard />

      {/* Social Proof */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex -space-x-2">
            {['RS', 'PN', 'MI'].map((a, i) => (
              <div key={i} className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold border-2 border-white">
                {a}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-800">2,400+</span> {t('home_riders_switched')}
          </p>
        </div>
        <button
          onClick={() => navigate('/community')}
          className="w-full text-green-600 font-semibold text-sm py-2.5 rounded-xl border-2 border-green-600 hover:bg-green-50 transition-colors active:scale-[0.98]"
        >
          {t('home_see_stories')}
        </button>
      </div>
    </div>
  );
};

/* ── Logged In User Home ── */
const LoggedInHome: React.FC = () => {
  const { loggedInUser } = useUser();
  const navigate = useNavigate();
  if (!loggedInUser) return null;

  return (
    <div className="p-4 space-y-6 pb-6">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Hello {loggedInUser.name} 👋</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Explore lithium upgrades for your vehicle</p>
      </div>

      {/* Primary Card (Soft CTA) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 to-emerald-500 p-6 text-white shadow-xl shadow-green-600/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="relative z-10">
          <h2 className="text-2xl font-black leading-tight mb-2">
            Upgrade your EV<br />to Lithium ⚡
          </h2>
          <p className="text-green-50 text-sm font-medium mb-6">
            Better range, faster charging, and lower running cost.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/application/start')}
              className="bg-white text-green-700 font-bold py-3.5 rounded-2xl hover:bg-green-50 transition-all active:scale-[0.98] shadow-lg shadow-black/5"
            >
              Check Eligibility
            </button>
            <button
              onClick={() => navigate('/explore')}
              className="bg-white/20 backdrop-blur-md text-white border border-white/30 font-bold py-3.5 rounded-2xl hover:bg-white/30 transition-all active:scale-[0.98]"
            >
              Explore Batteries
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900">See how others<br />are upgrading</h3>
        </div>
        <button
          onClick={() => navigate('/community')}
          className="bg-gray-900 text-white font-bold px-5 py-3 rounded-2xl text-xs active:scale-95 transition-all"
        >
          View Community
        </button>
      </div>

      {/* Referral Card (Optional for logged_in users as well?) */}
      {/* The prompt didn't explicitly mention referral card for logged_in, but keep it if simple */}
    </div>
  );
};

const HomeScreen: React.FC = () => {
  const { status } = useUser();
  if (status === 'installed') return <InstalledHome />;
  if (status === 'approved') return <ApprovedHome />;
  if (status === 'logged_in') return <LoggedInHome />;
  return <GuestHome />;
};

export default HomeScreen;
