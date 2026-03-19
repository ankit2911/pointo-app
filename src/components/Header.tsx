import React from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import type { UserStatus } from '../types';

const Header: React.FC = () => {
  const { status, setStatus, user, setPaymentStatus, setBatteryType } = useUser();
  const { t } = useLanguage();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100 shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-extrabold text-sm">P</span>
        </div>
        <span className="text-lg font-bold text-gray-900 tracking-tight">Pointo</span>
      </div>

      <div className="flex flex-col items-end">
        {/* User Status Dropdown */}
        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as UserStatus)}
            className="bg-gray-100 border-none text-[10px] uppercase tracking-wider font-bold text-gray-700 py-1.5 pl-3 pr-7 rounded-full outline-none cursor-pointer hover:bg-gray-200 transition-colors appearance-none"
          >
            <option value="guest">Guest</option>
            <option value="approved">Approved</option>
            <option value="installed">Installed</option>
          </select>
          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        <div className="flex gap-2">
          {/* Battery Mode Dropdown (Only for Installed) */}
          {status === 'installed' && (
            <div className="relative mt-1">
              <select
                value={user?.currentBatteryType}
                onChange={(e) => setBatteryType(e.target.value as any)}
                className="bg-blue-50 border-none text-[8px] uppercase tracking-widest font-black text-blue-700 py-1 pl-2 pr-6 rounded-md outline-none cursor-pointer hover:bg-blue-100 transition-colors appearance-none"
              >
                <option value="own">Own Battery</option>
                <option value="service">Service Battery</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-600">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          )}

          {status === 'installed' && (
            <div className="relative mt-1">
              <select
                value={user?.paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as any)}
                className="bg-green-50 border-none text-[8px] uppercase tracking-widest font-black text-green-700 py-1 pl-2 pr-6 rounded-md outline-none cursor-pointer hover:bg-green-100 transition-colors appearance-none"
              >
                <option value="active">Active</option>
                <option value="overdue">Overdue</option>
                <option value="defaulted">Defaulted</option>
                <option value="recovered">Recovered</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-green-600">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          )}
        </div>



        <span className="text-[8px] text-gray-400 mt-0.5 font-medium tracking-wide">{t('header_dev_mode')}</span>
      </div>
    </header>
  );
};

export default Header;
