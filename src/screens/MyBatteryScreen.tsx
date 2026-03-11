import React from 'react';
import { useUser } from '../context/UserContext';

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
          Dashboard is locked
        </h1>
        <p className="text-sm text-gray-500 text-center max-w-[260px]">
          Battery dashboard will activate after installation is complete.
        </p>
      </div>
    );
  }

  if (!user) return null;

  const emiProgress = (user.emiPaid / user.emiTotal) * 100;

  return (
    <div className="p-4 space-y-4 pb-6">
      {/* Greeting */}
      <div>
        <h1 className="text-xl font-extrabold text-gray-900">Hello, {user.name} 👋</h1>
        <p className="text-sm text-gray-500 flex items-center gap-1.5 mt-0.5">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full" />
          {user.batteryModel} · {user.vehicle}
        </p>
      </div>

      {/* Battery Health Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-gray-900">Battery Health</h2>
          <span className="text-[10px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase">Active</span>
        </div>
        <div className="flex items-center gap-5 mt-3">
          <div className="relative shrink-0">
            <ProgressRing percent={user.batteryHealth} size={110} stroke={8} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-gray-900">{user.batteryHealth}%</span>
              <span className="text-[10px] text-gray-400 font-medium">Health</span>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Range Estimate</p>
              <p className="text-lg font-extrabold text-gray-900">{user.rangeEstimate} <span className="text-xs font-medium text-gray-400">km</span></p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Charge Cycles</p>
              <p className="text-lg font-extrabold text-gray-900">{user.chargeCycles}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Battery Score Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-gray-900">Battery Score</h2>
          <div className="flex items-center gap-1">
            <span className="text-xl font-extrabold text-green-600">{user.batteryScore}</span>
            <span className="text-xs text-gray-400 font-medium">/ 10</span>
          </div>
        </div>
        <div className="space-y-3">
          <ScoreBar label="Charging Behaviour" value={user.chargingBehaviour} level={user.chargingBehaviour === 'Excellent' ? 95 : user.chargingBehaviour === 'Good' ? 78 : 55} />
          <ScoreBar label="Usage Efficiency" value={user.usageEfficiency} level={user.usageEfficiency === 'Excellent' ? 92 : user.usageEfficiency === 'Good' ? 75 : 50} />
        </div>
      </div>

      {/* Insights Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-900 mb-3">🧠 Battery Insights</h2>
        <div className="space-y-2">
          {[
            { icon: '⚠️', text: 'Avoid draining below 15% for longer battery life', color: 'bg-amber-50 text-amber-800 border-amber-100' },
            { icon: '✅', text: `Optimal daily range: 95–110 km. You're in the zone!`, color: 'bg-green-50 text-green-800 border-green-100' },
            { icon: '⚡', text: 'Fast charging detected twice this week — try to limit it', color: 'bg-blue-50 text-blue-800 border-blue-100' },
          ].map((tip, i) => (
            <div key={i} className={`flex items-start gap-2.5 p-3 rounded-xl text-xs font-medium border ${tip.color}`}>
              <span className="text-sm shrink-0">{tip.icon}</span>
              <span className="leading-relaxed">{tip.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Finance Status Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-500/10 rounded-full" />
        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">Finance Status</p>
        <h3 className="text-base font-bold mb-0.5">Pointo Finance</h3>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-2xl font-extrabold text-green-400">₹{user.emiAmount}</span>
          <span className="text-xs text-gray-400 mb-1">/month</span>
        </div>

        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">EMI Progress</span>
            <span className="font-semibold text-white">{user.emiPaid} / {user.emiTotal} paid</span>
          </div>
          <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${emiProgress}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-green-500 text-white font-semibold text-xs py-2.5 rounded-xl hover:bg-green-600 transition-colors active:scale-[0.98]">
            Pay EMI
          </button>
          <button className="flex-1 bg-white/10 text-white font-semibold text-xs py-2.5 rounded-xl hover:bg-white/20 transition-colors active:scale-[0.98]">
            View Statement
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-sm font-bold text-gray-900 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[
            { icon: '🔧', label: 'Request\nService' },
            { icon: '📞', label: 'Contact\nDealer' },
            { icon: '🛡️', label: 'Warranty\nDetails' },
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
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Your Dealer</p>
            <p className="text-xs font-bold text-gray-900">{user.dealer}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBatteryScreen;
