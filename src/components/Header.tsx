import React from 'react';

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-4 h-14 bg-white border-b border-gray-100 shrink-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-extrabold text-sm">P</span>
        </div>
        <span className="text-lg font-bold text-gray-900 tracking-tight">Pointo</span>
      </div>
      <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
        <LocationIcon />
        <span>Bangalore</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </header>
  );
};

export default Header;
