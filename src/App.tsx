import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import CommunityScreen from './screens/CommunityScreen';
import ProfileScreen from './screens/ProfileScreen';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      {/* Mobile container */}
      <div className="w-full max-w-[390px] h-screen max-h-[844px] bg-white flex flex-col shadow-2xl shadow-gray-400/30 overflow-hidden rounded-none sm:rounded-[2rem] sm:border sm:border-gray-200">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 scrollbar-hide">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/explore" element={<ExploreScreen />} />
            <Route path="/community" element={<CommunityScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default App;
