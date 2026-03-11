import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const HomeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ExploreIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CommunityIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BatteryIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
    <line x1="23" y1="10" x2="23" y2="14" />
    <line x1="6" y1="10" x2="6" y2="14" />
    <line x1="10" y1="10" x2="10" y2="14" />
  </svg>
);

const ProfileIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const guestTabs = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/explore', label: 'Explore', icon: ExploreIcon },
  { path: '/community', label: 'Community', icon: CommunityIcon },
  { path: '/profile', label: 'Profile', icon: ProfileIcon },
];

const installedTabs = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/explore', label: 'Explore', icon: ExploreIcon },
  { path: '/community', label: 'Community', icon: CommunityIcon },
  { path: '/my-battery', label: 'My Battery', icon: BatteryIcon },
  { path: '/profile', label: 'Profile', icon: ProfileIcon },
];

const BottomNav: React.FC = () => {
  const { status } = useUser();
  const tabs = status === 'installed' ? installedTabs : guestTabs;

  return (
    <nav className="flex items-center justify-around bg-white border-t border-gray-100 h-16 shrink-0">
      {tabs.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 py-1 px-2 text-[10px] font-medium transition-colors duration-200 ${
              isActive ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
            }`
          }
        >
          <Icon />
          <span className="leading-none">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
