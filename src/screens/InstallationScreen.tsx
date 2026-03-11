import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const InstallationScreen: React.FC = () => {
  const { approvedUser } = useUser();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!approvedUser) return null;

  const slots = ['10:00 AM', '2:00 PM', '5:00 PM'];

  return (
    <div className="p-4 space-y-4 pb-6">
      <div className="mb-2">
        <h1 className="text-xl font-extrabold text-gray-900">Installation Setup</h1>
        <p className="text-sm text-gray-500 mt-0.5">Let's get your EV upgraded</p>
      </div>

      {/* Installation Steps Tracker */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="space-y-4">
          {[
            { label: 'Financing Approved', done: true },
            { label: 'Battery Reserved', done: true },
            { label: 'Schedule Installation', active: true },
            { label: 'Installation Complete', pending: true }
          ].map((step, i) => (
            <div key={i} className="flex flex-row items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 ${
                step.done ? 'bg-green-600 border-green-600 text-white' 
                : step.active ? 'border-green-600 text-green-600 bg-green-50' 
                : 'border-gray-200 text-gray-400 bg-gray-50'
              }`}>
                {step.done ? <CheckIcon /> : <span className="text-xs font-bold">{i + 1}</span>}
              </div>
              <p className={`text-sm font-semibold ${
                step.done ? 'text-gray-900' 
                : step.active ? 'text-green-700' 
                : 'text-gray-400'
              }`}>{step.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Battery Details */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Reserved Battery</p>
            <h2 className="text-base font-bold text-gray-900">{approvedUser.batteryModel}</h2>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <p className="text-[10px] text-gray-400">Range</p>
            <p className="text-sm font-bold text-gray-900">110 km</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <p className="text-[10px] text-gray-400">Charge</p>
            <p className="text-sm font-bold text-gray-900">2.5 hrs</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-2.5 text-center">
            <p className="text-[10px] text-gray-400">Warranty</p>
            <p className="text-sm font-bold text-gray-900">4 Yrs</p>
          </div>
        </div>
      </div>

      {/* Dealership Details */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2">Assigned Dealer</p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">{approvedUser.dealer}</h3>
            <p className="text-xs text-gray-500 mt-0.5">Bangalore, Karnataka</p>
          </div>
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
            🏪
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-50 text-gray-700 font-semibold text-xs py-2.5 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
            Call Dealer
          </button>
          <button className="flex-1 bg-gray-50 text-gray-700 font-semibold text-xs py-2.5 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200">
            Get Directions
          </button>
        </div>
      </div>

      {/* Scheduling */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
          <CalendarIcon />
          Schedule Installation
        </h3>
        <p className="text-xs font-semibold text-gray-600 mb-2">Tomorrow</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-colors ${
                selectedSlot === slot 
                ? 'bg-green-50 border-green-500 text-green-700' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
        <button 
          disabled={!selectedSlot}
          className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all ${
            selectedSlot 
            ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-600/20 active:scale-[0.98]' 
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {selectedSlot ? 'Confirm Installation Slot' : 'Select a Time Slot'}
        </button>
      </div>
    </div>
  );
};

export default InstallationScreen;
