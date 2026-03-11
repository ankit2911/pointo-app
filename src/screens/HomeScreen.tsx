import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

const ZapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

/* ── Installed User Home ── */
const InstalledHome: React.FC = () => {
  const { user } = useUser();
  const { t } = useLanguage();
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Battery Snapshot */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-500 to-emerald-400 p-5 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
        <div className="relative z-10">
          <p className="text-xs text-green-100 font-semibold mb-1">{t('home_your_battery')} · {user.batteryModel}</p>
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
        <button className="w-full mt-4 bg-green-600 text-white font-semibold text-sm py-3.5 rounded-xl hover:bg-green-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-green-600/20">
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

const HomeScreen: React.FC = () => {
  const { status } = useUser();
  if (status === 'installed') return <InstalledHome />;
  if (status === 'approved') return <ApprovedHome />;
  return <GuestHome />;
};

export default HomeScreen;
